const Stops = require("../model/busStop");
const SearchHistory = require("../model/searchHistory");
const isNil = require("../utils");

const getStops = async (req, res) => {
  const stops = await Stops.find({});
  res.json(stops);
};

const findStop = async (req, res) => {
  const stopNo = req.params.stopNo;
  const request = {
    RouteNo: null,
    StopNo: stopNo
  }

  try {
    SearchHistory.create(request);
  } catch (err) {
    console.log(err);
  }
  
  const stop = await Stops.findOne({ StopNo: stopNo });

  if (isNil(stop)) {
    res.status(404).send("No stops found");
  } else {
    console.log(stop);
    res.json(stop);
  }
};

module.exports = { getStops, findStop };
