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
const uploadProjectRoute = require("./controllers/createProjectController")