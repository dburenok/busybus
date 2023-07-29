const BusStopOnRoute = require("../model/bus-stops-on-route");
const BusStop = require("../model/bus-stop");
const isNil = require("../utils");
const Bus = require("../model/bus");

const getRoutes = async (req, res) => {
  const routes = await BusStopOnRoute.find({});
  res.json(routes);
};

const findRoute = async (req, res) => {
  const routeNo = req.params.routeNo;
  const route = await BusStopOnRoute.findOne({ RouteNo: routeNo });

  if (isNil(route)) {
    return res.status(404).send("No route found");
  }

  const stopNos = route["StopNos"].map((stopNo) => `${stopNo}`);
  const stops = await BusStop.find({ StopNo: { $in: stopNos } });
  res.send(stops);
};

const getBusesOnRoute = async (req, res) => {
  const selectedRoute = req.params.selectedRoute;
  const busesOnRoutes = await Bus.find({ RouteNo: selectedRoute });

  res.json(busesOnRoutes);
};

module.exports = { getRoutes, findRoute, getBusesOnRoute };
