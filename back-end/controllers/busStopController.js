const BusStop = require("../model/bus-stop");
const Bus = require("../model/bus");
const SearchHistory = require("../model/search-history");
const isNil = require("../utils");

const getStops = async (req, res) => {
  const stops = await BusStop.find({});
  res.json(stops);
};

const findStop = async (req, res) => {
  const stopNo = req.params.stopNo;
  const request = {
    RouteNo: null,
    StopNo: stopNo,
  };

  try {
    await SearchHistory.create(request);
  } catch (err) {
    console.log(err);
  }

  const stop = await BusStop.findOne({ StopNo: stopNo });

  if (isNil(stop)) {
    res.status(404).send("No stops found");
  } else {
    res.json(stop);
  }
};

const getBusesOnStop = async (req, res) => {
  const stopNo = req.params.stopNo;
  const stop = await BusStop.findOne({ StopNo: stopNo });

  const routes = stop["Routes"].split(", ").filter((route) => route !== "");
  const busesOnRoutes = await Bus.find({ RouteNo: { $in: routes } });

  res.json(busesOnRoutes);
};

module.exports = { getStops, findStop, getBusesOnStop };
