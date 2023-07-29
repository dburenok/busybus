const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Bus = require("./model/bus");
require("dotenv").config();

const MONGO_USER = process.env.BUSYBUS_MONGO_USER;
const MONGO_PASS = process.env.BUSYBUS_MONGO_PASS;
const mongoose_uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@busybuscluster0.eybkfr8.mongodb.net/dev?retryWrites=true&w=majority`;
const API_KEY = process.env.TRANSLINK_API_KEY;
const API_BASE_URL = "https://api.translink.ca/rttiapi/v1";

const BUS_FETCH_INTERVAL_SEC = 30;
const REMOVE_OUT_OF_DATE_CAPACITY_INTERVAL_MIN = 5;
const CAPACITY_INTERVAL_MINS = 30;

const stopsRouter = require("./routes/busStops");
const routesRouter = require("./routes/busRoutes");
const estimatesRouter = require("./routes/estimates");
const capacityRouter = require("./routes/busCapacity");
const axios = require("axios");
const BusCapacity = require("./model/bus-capacity");

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
app.use(cors({ origin: "https://busybus-front-end.onrender.com" }));

app.use("/stops", stopsRouter);
app.use("/routes", routesRouter);
app.use("/estimates", estimatesRouter);
app.use("/capacity", capacityRouter);

setInterval(fetchBuses, BUS_FETCH_INTERVAL_SEC * 1000);
setInterval(
  removeOutOfDateCapacityInfo,
  REMOVE_OUT_OF_DATE_CAPACITY_INTERVAL_MIN * 60 * 1000
);

module.exports = app;

async function fetchBuses() {
  const requestString = `${API_BASE_URL}/buses?apikey=${API_KEY}`;
  const response = await axios.get(requestString);
  const buses = response.data;

  await Bus.deleteMany({});
  await Bus.insertMany(buses);

  console.log(`Fetched and saved ${buses.length} buses to MongoDB`);
}

async function removeOutOfDateCapacityInfo() {
  let outdatedBusCapacity = await BusCapacity.aggregate([
    {
      $addFields: {
        reportTimeDiff: {
          $dateDiff: {
            startDate: "$ReportTime",
            endDate: "$$NOW",
            unit: "minute",
          },
        },
      },
    },
    {
      $match: { reportTimeDiff: { $gt: CAPACITY_INTERVAL_MINS } },
    },
  ]);

  outdatedBusCapacity = outdatedBusCapacity.map((bus) => bus.VehicleNo);

  const removed = await BusCapacity.deleteMany({
    VehicleNo: { $in: outdatedBusCapacity },
  });

  console.log(`Removed ${removed.deletedCount} outdated bus capacities`);
}
