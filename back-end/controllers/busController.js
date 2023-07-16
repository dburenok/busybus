const Stops = require("../model/bus-stop");
const SearchHistory = require("../model/search-history");
const isNil = require("../utils");
const axios = require("axios");
const API_KEY = process.env.TRANSLINK_API_KEY;

const fetchBuses = async (req, res) => {
  const requestString = `https://api.translink.ca/rttiapi/v1/buses?apikey=${API_KEY}`;
  try {
    const response = await axios.get(requestString);
    const buses = response.data;
    await Promise.all(buses.map((bus) => Bus.create(bus)));
  } catch (e) {}

  try {
    SearchHistory.create(request);
  } catch (err) {
    console.log(err);
  }
  res.json(stops);
};

const findStop = async (req, res) => {
  const stopNo = req.params.stopNo;
  const request = {
    RouteNo: null,
    StopNo: stopNo,
  };

  try {
    SearchHistory.create(request);
  } catch (err) {
    console.log(err);
  }

  const stop = await Stops.findOne({ StopNo: stopNo });

  if (isNil(stop)) {
    res.status(404).send("No stops found");
  } else {
    res.json(stop);
  }
};

module.exports = { fetchBuses };
