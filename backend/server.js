require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { WebSocket } = require("ws");
const { parse } = require("url");
const v4 = require('uuid');
const https = require("https");
const fs = require("fs");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { uploadProjPicture, uploadProjRepo } = require("./controllers/createProjectController")

var basePath = '/api';
var port = process.env.API_PORT;

// Handle CORS
const cors = require("cors");
const { getSystemErrorMap } = require("util");

app.use(
  cors({
    origin: '*',
  })
);

// Set up Express to listen on API_PORT
const server = app.listen(API_PORT, () => {
  console.log(`Listening on port ${port}`);
});

// Connect to MongoDB using Mongoose

mongoose.connect(process.env.MONGO_URI).then((db) => {
  const User = require("./models/User")(db);
  const Project = require("./models/Project")(db);


  app.get(`${BASE_URL}`, (req, res) => {
    res.send("Project Factory API");
  });

  // Setup body-parser middleware
  app.use(
    bodyParser.urlencoded({
      extended: true,
      parameterLimit: 100000000,
      limit: "50mb",
    })
  );
  app.use(bodyParser.json({ limit: "50mb", parameterLimit: 100000000 }));

  // Initialize passport
  app.use(passport.initialize());

  // Initialize passport strategies
  require("./middleware/localStrategy")(User, passport);

  // Setup Router
  app.use(`${BASE_URL}`, router);

  // Verify JWT endpoint
  router.get(`/user/verify_header`, verifyUser, (req, res, next) => {
    const decoded = res.locals.authData;
    res.status(200).json({ status: "Authorized", data: decoded });
  });

  // Google OAuth2 endpoint callback
  router.get(`/user/auth/google_callback`, (req, res, next) => {
    passport.authenticate(
      "google-login",
      { session: false },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.redirect(
            `${process.env.BASE_URL}:${process.env.FRONTEND_PORT}/signin`
          );
        } else {
          const token = signJwt(user);
          const returnData = Buffer.from(
            JSON.stringify({
              token: token,
              authData: jwt.decode(token, { json: true, complete: true }),
            })
          ).toString("base64");
          res.redirect(
            `${process.env.BASE_URL}:${process.env.FRONTEND_PORT}/signin/callback/?d=${returnData}`
          );
        }
      }
    )(req, res, next);
  });

  router.get(
    `/user/auth/google`,
    passport.authenticate("google-login", {
      scope: ["email", "profile"],
    })
  );

  // Login route with Passport
  router.post(`/user/authenticate`, (req, res, next) => {
    passport.authenticate("local-signin", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          message: "Login failed.",
        });
      }
      const token = signJwt(user);

      return res.status(200).json({
        message: "Login successful",
        token: token,
        authData: jwt.decode(token, { json: true, complete: true }),
      });
    })(req, res, next);
  });

  router.post(`/user/create`, (req, res, next) => {
    console.log("Reached API");
    passport.authenticate("local-signup", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(409).json({
          message: info.message,
        });
      }
      return res.status(200).json({
        message: "Registration successful",
      });
    })(req, res, next);
  });

  uploadProjRepo(router, User, Project);

  uploadProjPicture(router, User, Project);

  
});