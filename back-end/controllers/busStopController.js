const BusStop = require("../model/bus-stop");
const BusStopLocation = require("../model/bus-stop-location");
const SearchHistory = require("../model/search-history");
const isNil = require("../utils");

const getStops = async (req, res) => {
  const stops = await BusStop.find({});
  res.json(stops);
};

const findStopLatLong = async (req, res) => {
  const lat = req.params.latitude;
  const long = req.params.longitude;

  const stop = await BusStopLocation.findOne({
    geoloc: {
      $near: {
        $geometry: {
           type: "Point" ,
           coordinates: [ long , lat ]
        },
        $maxDistance: 500,
        $minDistance: 0
      }
    }
 });

  if (isNil(stop)) {
    res.status(404).send("No stops found");
  } else {
    res.json(stop);
  }
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

module.exports = { getStops, findStop, findStopLatLong};
