require("dotenv").config();

("use strict");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require("morgan");

const PORT = 8000;
const handlers = require("./handlers");

const MONGO_URI = `mongodb+srv://user1:${process.env.MongoURI}@cluster0.7qjdc.mongodb.net/BabyApp?retryWrites=true&w=majority`;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(cors({ origin: "https://determined-meninsky-6de7d1.netlify.app" }))
  // .use(
  //   session({
  //     secret: "keyboard cat",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { secure: true },
  //   })
  // )
  .use(session({
    secret: 'foo',
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }))

  .use(
    "/api/v1/auth/google",
    handlers.authorizeGoogle,
    handlers.isAuthenticated,
    handlers.userInfo,
    handlers.getUserDetails,
    handlers.addUserdb
  )
  .get('/', (req, res) => {
    res.send('Well, hello there. It seems things are in order!')
  })
  .get(
    "/me",
    handlers.isAuthenticated,
    handlers.userInfo,
    handlers.getUserDetails
  )

  .get("/getAlbumId", (req, res) => {
    handlers.getAlbumId(req, res, "BabyApp");
  })

  .post("/populategallery", handlers.isAuthenticated, handlers.getPhotos)

  .post(
    "/populategallerynextpage",
    handlers.isAuthenticated,
    handlers.getPhotosNextPage
  )

  .get("/populateregistry", (req, res) => {
    handlers.getRegistryEntries(req, res, "BabyApp");
  })

  .post("/addregistryitem", (req, res) => {
    handlers.addRegistryEntry(req, res, "BabyApp");
  })

  .delete("/deleteregistryitem", (req, res) => {
    handlers.deleteRegistryEntry(req, res, "BabyApp");
  })

  .put("/buyregistryitem", (req, res) => {
    handlers.buyRegistryEntry(req, res, "BabyApp");
  })

  .put("/unbuyregistryitem", (req, res) => {
    handlers.unbuyRegistryEntry(req, res, "BabyApp");
  })

  .get("/populatebabyfact", (req, res) => {
    handlers.getBabyFact(req, res, "BabyApp");
  })

  .get("/populatetargetdate", (req, res) => {
    handlers.getTargetDate(req, res, "BabyApp");
  })

  .put("/updateTargetDate", (req, res) => {
    handlers.updateTargetDate(req, res, "BabyApp");
  })

  .listen(process.env.PORT || 8000, () => {
    console.info(`Listening on port ${PORT}`);
  });
