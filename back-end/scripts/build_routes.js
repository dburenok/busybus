const { MongoClient, ServerApiVersion } = require("mongodb");

const MONGO_USER = process.env.BUSYBUS_MONGO_USER;
const MONGO_PASS = process.env.BUSYBUS_MONGO_PASS;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@busybuscluster0.eybkfr8.mongodb.net/dev?retryWrites=true&w=majority`;
const routes = new Map();

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  const stopsCollection = client.db("dev").collection("bus-stop");
  const stops = await stopsCollection.find({}).toArray();
  const stopsWithRoutes = stops.filter((stop) => stop["Routes"] !== "");
  for (const stop of stopsWithRoutes) {
    const stopRoutes = stop["Routes"].split(", ");
    stopRoutes.forEach((stopRoute) => {
      if (!routes.has(stopRoute)) {
        routes.set(stopRoute, [stop["StopNo"]]);
      } else {
        routes.set(stopRoute, [...routes.get(stopRoute), stop["StopNo"]]);
      }
    });
  }

  const routeObject = Object.fromEntries(routes);

  const busStopsOnRouteCollection = client
    .db("dev")
    .collection("bus-stops-on-route");
  await Promise.all(
    Object.entries(routeObject).map(([route, busStopsArray]) =>
      busStopsOnRouteCollection.updateOne(
        { _id: route },
        { $set: { RouteNo: route, StopNos: busStopsArray } },
        { upsert: true }
      )
    )
  );

  console.log(`DONE. Built ${routes.size} routes`);
  process.exit(0);
})();
