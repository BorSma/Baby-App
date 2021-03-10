require("dotenv").config();

("use strict");

const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
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

  .get("/", (req, res) => res.status(200).json("🥓"))

  .post("/api/v1/auth/google", async (req, res) => {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const { name, email, picture } = ticket.getPayload();
      // const user = await db.user.upsert({
      //   where: { email: email },
      //   update: { name, picture },
      //   create: { name, email, picture },
      // });
      console.log(ticket.getPayload());
      res.status(201);
      //res.json(name, email, picture);
      res.json(ticket.getPayload());
    } catch (err) {
      console.log("Error: ", err);
    }
  })

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
