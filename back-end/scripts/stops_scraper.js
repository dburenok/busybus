const axios = require("axios");
const { MongoClient, ServerApiVersion } = require("mongodb");

const MONGO_USER = process.env.BUSYBUS_MONGO_USER;
const MONGO_PASS = process.env.BUSYBUS_MONGO_PASS;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@busybuscluster0.eybkfr8.mongodb.net/dev?retryWrites=true&w=majority`;
const API_KEY = process.env.TRANSLINK_API_KEY;

const scrapedBusStops = new Map();
const step = 0.02;
const totalRequests = 270;
let numRequests = 0;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  const startLat = 49.28841511236911;
  const startLong = -123.2783681822549;

  // const endLat = startLat - 2 * step; // for testing
  // const endLong = startLong + 2 * step; // for testing
  const endLat = 49.10818041935406;
  const endLong = -122.75219970103944;

  for (let lat = startLat; lat > endLat; lat -= step) {
    for (let lng = startLong; lng < endLong; lng += step) {
      const latTrimmed = trimLatLongString(lat);
      const lngTrimmed = trimLatLongString(lng);
      const requestString = `https://api.translink.ca/rttiapi/v1/stops?apikey=${API_KEY}&lat=${latTrimmed}&long=${lngTrimmed}&radius=2000`;
      numRequests++;
      const progress = Math.floor((numRequests / totalRequests) * 100);

      try {
        const response = await axios.get(requestString);
        const busStopsWithinRadius = response.data;
        for (const busStop of busStopsWithinRadius) {
          scrapedBusStops.set(busStop["StopNo"], busStop);
        }
        console.log(`[${progress}%] ${busStopsWithinRadius.length} stops`);
      } catch (e) {}
    }
  }

  const busStopsObject = Object.fromEntries(scrapedBusStops);
  const stopsCollection = client.db("dev").collection("bus-stop");
  await stopsCollection.deleteMany({});

  await Promise.all(
    Object.entries(busStopsObject).map(([_id, busStop]) =>
      stopsCollection.updateOne({ _id }, { $set: busStop }, { upsert: true })
    )
  );
  console.log(`DONE. Scraped ${Object.keys(busStopsObject).length} stops`);
  process.exit(0);
})();

function trimLatLongString(num) {
  return num.toFixed(6);
}
