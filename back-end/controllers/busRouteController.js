const Routes = require("../model/busRoute");

// GET all routes
const getRoutes = async (req, res) => {
    const routes = await Routes.find({});
    res.status(200).json(routes);
}

// GET a specific RouteNo
const findRoute = async (req, res) => {
    const routeNo = req.params.id;
    console.log(routeNo);
    try {
        const route = await Routes.find({RouteNo: routeNo});
        if (!route) res.status(404).send("No route found")
        res.status(200).json(route);
      } catch (error) {
        res.status
      }
}

module.exports = {getRoutes, findRoute};