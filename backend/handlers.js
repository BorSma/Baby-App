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

async function userInfo(req, res) {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: req.session.token,
      audience: keys.web.client_id,
    });
    const { name, email, picture } = ticket.getPayload();
    res.status(200).json({ name, email, picture });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getUserDetails(req, res) {
  //mongodb
  //res.json
}

async function getPhotos(req, res) {
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
          "AHnwMrg1jdh_WV9THujBnHA3ifNd37GuLswIXsvu_Hewitns6csjxgKtKozDpeq8ujH6gZaNas2I",
      },
    });
    //console.log(response);
    res.status(200).json(response.data);
  } catch (err) {
    console.log({ error: err });
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
          "AHnwMrg1jdh_WV9THujBnHA3ifNd37GuLswIXsvu_Hewitns6csjxgKtKozDpeq8ujH6gZaNas2I",
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
  var startPos = req.query.start;
  var limit = req.query.limit;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db(dbName);
  const data = await db.collection("registry").find().toArray();

  if (
    startPos !== undefined &&
    limit !== undefined &&
    limit > startPos &&
    data.length > 0
  ) {
    var registryItems = data.slice(startPos, limit);
  } else if (limit === undefined && startPos !== undefined && data.length > 0) {
    var registryItems = data.slice(parseInt(startPos), parseInt(startPos) + 25);
    //console.log("data", data);
    // console.log(
    //   "Start Position given but no limit",
    //   startPos,
    //   parseInt(startPos) + 25,
    //   registryItems
    // );
  } else {
    var registryItems = data.slice(0, 25);
  }

  if (registryItems.length > 0)
    res.status(201).json({ status: 201, registryItems: registryItems });
  else res.status(404).json({ status: 404, data: "Not Found" });
  client.close();
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
    console.log("Error: ", err.message);
  }
};

const deleteRegistryEntry = async (req, res, dbName) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    const id = new ObjectID(req.headers._id.valueOf());
    console.log(id);
    const result = await db.collection("registry").deleteOne({ _id: id });
    console.log(result.deletedCount);
    res.status(201).json({ status: 201 });
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getBabyFact = async (req, res, dbName) => {
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
      console.log(result);
    });
};

const updateTargetDate = async (req, res, dbName) => {
  console.log( req.headers.targetdate);
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
  authorizeGoogle,
  isAuthenticated,
  userInfo,
  getUserDetails,
  getPhotos,
  getPhotosNextPage,
  getRegistryEntries,
  getBabyFact,
  getTargetDate,
  addRegistryEntry,
  deleteRegistryEntry,
  updateTargetDate
};
