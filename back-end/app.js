const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const MONGO_USER = process.env.BUSYBUS_MONGO_USER;
const MONGO_PASS = process.env.BUSYBUS_MONGO_PASS;
const mongoose_uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@busybuscluster0.eybkfr8.mongodb.net/busybus?retryWrites=true&w=majority`;

const stopsRouter = require("./routes/busStops");
const routesRouter = require("./routes/busRoutes");

const app = express();

mongoose
  .connect(mongoose_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Atlas connection successful");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/stops", stopsRouter);
app.use("/routes", routesRouter);

module.exports = app;
