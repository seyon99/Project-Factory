require("dotenv").config();

import express, { static } from "express";
const app = express();
import { join } from "path";

const FRONTEND_PORT = process.env.FRONTEND_PORT || 8000;

app.use(static(join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build/index.html"));
});

app.listen(FRONTEND_PORT, () => {
  console.log(`Serving on port ${FRONTEND_PORT}`);
});