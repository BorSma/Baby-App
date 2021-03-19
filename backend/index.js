require("dotenv").config();

("use strict");

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");

const morgan = require("morgan");

const PORT = 8000;
const handlers = require("./handlers");
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
  .use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  )

  .use(
    "/api/v1/auth/google",
    handlers.authorizeGoogle,
    handlers.isAuthenticated,
    handlers.userInfo
  )
  .get("/me", handlers.isAuthenticated, handlers.userInfo)
  .post("/populategallery", handlers.isAuthenticated, handlers.getPhotos)
  .post("/populategallerynextpage", handlers.isAuthenticated, handlers.getPhotosNextPage)

  .get("/populateregistry", (req, res) => {
    handlers.getRegistryEntries(req, res, "BabyApp");
  })
  

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
