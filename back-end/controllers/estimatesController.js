const axios = require("axios");
const API_KEY = process.env.TRANSLINK_API_KEY;

const getEstimates = async (req, res) => {
  const stopNo = req.params.stopNo;
  const routeNo = req.params.routeNo;
  const requestString = `https://api.translink.ca/rttiapi/v1/stops/${stopNo}/estimates?apikey=${API_KEY}&routeNo=${routeNo}`;

  const response = await axios.get(requestString);
  const estimates = aggregateEstimates(response.data);

  res.json(estimates);
};

module.exports = { getEstimates };

function aggregateEstimates(rawEstimates) {
  if (rawEstimates.length === 0) {
    return {};
  }
  const schedules = rawEstimates[0]["Schedules"];
  const patterns = schedules.map((schedule) => schedule["Pattern"]);
  const uniquePatterns = [...new Set(patterns)];

  const estimates = {};

  for (const pattern of uniquePatterns) {
    estimates[pattern] = schedules.filter(
      (schedule) => schedule["Pattern"] === pattern
    );
  }

  return estimates;
}
