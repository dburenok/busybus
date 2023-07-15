const Route = require("../model/busRoute");
const Stop = require("../model/busStop");
const isNil = require("../utils");

const getRoutes = async (req, res) => {
  const routes = await Route.find({});
  res.json(routes);
};

const findRoute = async (req, res) => {
  const routeNo = req.params.routeNo;
  const route = await Route.findOne({ RouteNo: routeNo });

  if (isNil(route)) {
    return res.status(404).send("No route found");
  }

  const stopNos = route["StopNos"].map((stopNo) => `${stopNo}`);
  const stops = await Stop.find({ StopNo: { $in: stopNos } });
  res.send(stops);
};

module.exports = { getRoutes, findRoute };
