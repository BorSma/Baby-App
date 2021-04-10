require("dotenv").config();
const { MongoClient, ObjectID } = require("mongodb");

const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const keys = require("../oauth2.keys.json");

const MONGO_URI = `mongodb+srv://user1:${process.env.MongoURI}@cluster0.7qjdc.mongodb.net/BabyApp?retryWrites=true&w=majority`;

const assert = require("assert");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

const authorizeGoogle = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    req.session.token = token;
    next();
  } else {
    res.status(400).json({
      msg: "not authenticated",
    });
  }
};

async function isAuthenticated(req, res, next) {
  if (req.session.token) {
    next();
  } else if (req.headers.authorization) {
    const bearerToken = req.headers.authorization;
    req.session.token = bearerToken.split("Bearer ").join("");
    next();
  } else {
    res.status(400).json({
      msg: "not authenticated",
    });
  }
}

async function userInfo(req, res, next) {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: req.session.token,
      audience: keys.web.client_id,
    });
    const payload = ticket.getPayload();
    req.session.email = payload.email;
    req.session.name = payload.name;
    req.session.picture = payload.picture;
    next();
  } catch (err) {
    res.status(400).json({ userInfoerror: err });
    console.log(err);
  }
}

async function getUserDetails(req, res, next) {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("BabyApp");
    await db
      .collection("users")
      .findOne({ email: req.session.email }, (err, result) => {
        result
          ? res.status(200).json({
              status: 200,
              data: {
                ...result,
              },
            })
          : next();
        client.close();
      });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err });
  }
}

async function addUserdb(req, res) {
  console.log(`addUserdb`);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("BabyApp");
    await db.collection("users").insertOne({
      email: req.session.email,
      name: req.session.name,
      picture: req.session.picture,
      role: "user",
    });
    res.status(200).json({
      status: 200,
      data: {
        email: req.session.email,
        name: req.session.name,
        picture: req.session.picture,
        role: "user",
      },
    });
    client.close();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

async function getAlbumId(req, res) {
  try {
    const url = "https://photoslibrary.googleapis.com/v1/sharedAlbums";
    const response = await axios({
      url: url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

async function getPhotos(req, res) {
  console.log(`getPhotos`, req.headers);
  try {
    const url = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
    const response = await axios({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      data: {
        pageSize: "25",
        albumId: `${req.headers.albumid}`,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log({ error: err.message });
    res.status(400).json({ error: err });
  }
}

async function getPhotosNextPage(req, res) {
  try {
    const url = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
    const response = await axios({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      data: {
        pageSize: "25",
        albumId:
          //"AHnwMrg1jdh_WV9THujBnHA3ifNd37GuLswIXsvu_Hewitns6csjxgKtKozDpeq8ujH6gZaNas2I",
          req.headers.albumid,
        pageToken: req.headers.pagetoken,
      },
    });
    //console.log(response.data);
    res.status(200).json(response.data);
  } catch (err) {
    console.log({ error: err });
    res.status(400).json({ error: err });
  }
}

const getRegistryEntries = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    //const client = await MongoClient("123", options);
    await client.connect();
    const db = client.db(dbName);
    const registryItems = await db.collection("registry").find().toArray();
    if (registryItems.length > 0) {
      res.status(201).json({
        status: 201,
        registryItems: registryItems,
        message: "Successfully fetched Registry Items",
      });
    }
    client.close();
  } catch (err) {
    console.log("erorr", err);
    res.status(404).json({ status: 404, error: "Registry Items not fetched" });
  }
};

const addRegistryEntry = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const data = await db
      .collection("registry")
      .insertOne(JSON.parse(req.headers.data));
    res.status(201).json({ status: 201 });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
    console.log("Error: ", err.message);
  }
};

const deleteRegistryEntry = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const id = new ObjectID(req.headers._id.valueOf());
    const result = await db.collection("registry").deleteOne({ _id: id });
    res.status(201).json({ status: 201 });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
    console.log("Error: ", err);
  }
};

const buyRegistryEntry = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const id = new ObjectID(req.headers._id.valueOf());
    const result = await db
      .collection("registry")
      .updateOne(
        { _id: id },
        { $set: { bought: "true", buyer: req.headers.buyer } }
      );
    res.status(200).json({ status: 200 });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
    console.log("Error: ", err);
  }
};

const unbuyRegistryEntry = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const id = new ObjectID(req.headers._id.valueOf());
    const result = await db
      .collection("registry")
      .updateOne({ _id: id }, { $set: { bought: "false", buyer: "" } });
    res.status(200).json({ status: 200 });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
    console.log("Error: ", err);
  }
};

const getBabyFact = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    await db
      .collection("BabyFacts")
      .findOne({ Month: req.headers.monthsleft.toString() }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, data: result })
          : res.status(404).json({ status: 404, data: "Not Found" });
        client.close();
      });
  } catch (err) {
    res.status(404).json({ status: 404, data: "Error" });
    console.log("Error: ", err);
  }
};

const getTargetDate = async (req, res, dbName) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db(dbName);
  await db
    .collection("AppData")
    .findOne({ name: "targetDate" }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, data: { ...result } })
        : res.status(404).json({ status: 404, data: "Not Found" });
      client.close();
    });
};

const updateTargetDate = async (req, res, dbName) => {
  console.log(req.headers.targetdate);
  try {
    const newValues = { $set: { ...req.body } };
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    await db
      .collection("AppData")
      .updateOne(
        { name: "targetDate" },
        { $set: { value: req.headers.targetdate } }
      );
    res.status(200).json({ status: 200 });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
    console.log("Error: ", err);
  }
};

module.exports = {
  addUserdb,
  authorizeGoogle,
  isAuthenticated,
  userInfo,
  getUserDetails,
  getPhotos,
  getPhotosNextPage,
  getRegistryEntries,
  getBabyFact,
  getTargetDate,
  getUserDetails,
  getAlbumId,
  addRegistryEntry,
  buyRegistryEntry,
  unbuyRegistryEntry,
  deleteRegistryEntry,
  updateTargetDate,
};
