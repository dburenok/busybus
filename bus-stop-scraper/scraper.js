const axios = require("axios");
const fs = require("fs");

const busStops = new Map();
let numBusStops = 0;

const API_KEY = process.env.TRANSLINK_API_KEY;

(async () => {
  const startLat = 49.265728;
  const startLong = -123.204853;

  for (let w = 0; w < 20; w++) {
    for (let h = 0; h < 3; h++) {
      const latRaw = startLat - 0.025 * h;
      const longRaw = startLong + 0.025 * w;
      const lat = trimLatLongString(latRaw);
      const long = trimLatLongString(longRaw);
      const requestString = `https://api.translink.ca/rttiapi/v1/stops?apikey=${API_KEY}&lat=${lat}&long=${long}&radius=2000`;

      try {
        const response = await axios.get(requestString);
        const busStopsWithinRadius = response.data;

        for (const busStop of busStopsWithinRadius) {
          const id = busStop["StopNo"];
          busStops.set(id, busStop);
          numBusStops++;
        }

        console.log(
          `fetched ${busStopsWithinRadius.length} stops in (${lat}, ${long})`
        );
      } catch (e) {
        console.log(`error fetching in (${lat}, ${long})`);
      }
    }
  }

  const busStopsObject = {
    count: numBusStops,
    stops: Object.values(Object.fromEntries(busStops)),
  };

  fs.writeFileSync("bus_stops.json", JSON.stringify(busStopsObject, null, 2));
})();

function trimLatLongString(num) {
  return [
    num.toString(10).split(".")[0],
    num.toString(10).split(".")[1].slice(0, 6),
  ].join(".");
}
