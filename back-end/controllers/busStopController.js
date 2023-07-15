const Stops = require("../model/busStop");
const isNil = require("../utils");

const getStops = async (req, res) => {
  const stops = await Stops.find({});
  res.json(stops);
};

const findStop = async (req, res) => {
  const stopNo = req.params.stopNo;

  const stop = await Stops.findOne({ StopNo: stopNo });

  if (isNil(stop)) {
    res.status(404).send("No stops found");
  } else {
    res.json(stop);
  }
};

module.exports = { getStops, findStop };
