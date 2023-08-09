const BusStop = require("../model/bus-stop");
const BusStopLocation = require("../model/bus-stop-location");
const SearchHistory = require("../model/search-history");
const BusStopOnRoute = require("../model/bus-stops-on-route");
const isNil = require("../utils");

const getStops = async (req, res) => {
  const stops = await BusStop.find({});
  res.json(stops);
};

const findStopLatLong = async (req, res) => {
  const lat = req.params.latitude;
  const long = req.params.longitude;

  const routeNo = req.params.routeNo;
  const route = await BusStopOnRoute.findOne({ RouteNo: routeNo });
  
  console.log(route)

  if (isNil(route)) {
    return res.status(404).send("No route found");
  }

  const stopNos = route["StopNos"].map((stopNo) => `${stopNo}`);

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
    },
    StopNo: { $in: stopNos}
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
