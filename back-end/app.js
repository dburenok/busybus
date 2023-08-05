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

const BUS_FETCH_INTERVAL = 30 * 1000; // 30 seconds

const REMOVE_OUT_OF_DATE_CAPACITY_INTERVAL = 5 * 60 * 1000; // 5 minutes
const REMOVE_OUT_OF_DATE_BUSES_INTERVAL = 5 * 60 * 1000; // 5 minutes

const BUS_OUTDATED_MINS = 5;
const CAPACITY_OUTDATED_MINS = 30;

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
app.use(
  cors({
    origin:
      process.env.BUSY_BUS_ENV === "dev"
        ? "http://localhost:3000"
        : "https://busybus-front-end.onrender.com",
  })
);

app.use("/stops", stopsRouter);
app.use("/routes", routesRouter);
app.use("/estimates", estimatesRouter);
app.use("/capacity", capacityRouter);

fetchBuses();
setInterval(fetchBuses, BUS_FETCH_INTERVAL);
setInterval(removeOutOfDateBuses, REMOVE_OUT_OF_DATE_BUSES_INTERVAL);
setInterval(removeOutOfDateCapacityInfo, REMOVE_OUT_OF_DATE_CAPACITY_INTERVAL);

module.exports = app;

async function fetchBuses() {
  const requestString = `${API_BASE_URL}/buses?apikey=${API_KEY}`;
  const response = await axios.get(requestString);
  const buses = response.data;

  const ReportTime = new Date();

  await Promise.all(
    buses.map((bus) =>
      Bus.updateOne(
        { VehicleNo: bus["VehicleNo"] },
        { ...bus, ReportTime },
        { upsert: true }
      )
    )
  );

  console.log(`Updated ${buses.length} buses in MongoDB.`);
}

async function removeOutOfDateBuses() {
  let outdatedBuses = await Bus.aggregate([
    {
      $addFields: {
        fetchTimeDiff: {
          $dateDiff: {
            startDate: "$ReportTime",
            endDate: "$$NOW",
            unit: "minute",
          },
        },
      },
    },
    {
      $match: { fetchTimeDiff: { $gt: BUS_OUTDATED_MINS } },
    },
  ]);

  outdatedBuses = outdatedBuses.map((bus) => bus.VehicleNo);

  const removed = await Bus.deleteMany({
    VehicleNo: { $in: outdatedBuses },
  });

  console.log(`Removed ${removed.deletedCount} outdated buses.`);
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
      $match: { reportTimeDiff: { $gt: CAPACITY_OUTDATED_MINS } },
    },
  ]);

  outdatedBusCapacity = outdatedBusCapacity.map((bus) => bus.VehicleNo);

  const removed = await BusCapacity.deleteMany({
    VehicleNo: { $in: outdatedBusCapacity },
  });

  console.log(`Removed ${removed.deletedCount} outdated bus capacities.`);
}
