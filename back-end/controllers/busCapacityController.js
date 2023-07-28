const BusCapacity = require("../model/bus-capacity");

const getBusCapacity = async (req, res) => {
  // find average capacity level of the bus and round it to 1 decimal place
  const busNo = req.params.busNo;
  const capacity = await BusCapacity.aggregate([
    {
      $match: { VehicleNo: { $eq: busNo } },
    },
    {
      $group: {
        _id: "$VehicleNo",
        avgCapacity: { $avg: "$Capacity" },
      },
    },
    {
      $addFields: {
        roundedAvgCapacity: { $round: ["$avgCapacity", 1] },
      },
    },
    { $project: { roundedAvgCapacity: 1, countUsefulReport: 1 } },
  ]);

  // count the number of valid capacity report
  // cannot be generated at the same time with average capacity
  const usefulInfoCount = await BusCapacity.aggregate([
    {
      $match: { VehicleNo: { $eq: busNo } },
    },
    { $count: "countUsefulReport" },
  ]);

  if (capacity.length === 0) {
    return res
      .status(200)
      .send({ _id: busNo, avgCapacity: -1, countUsefulReport: 0 });
  } else {
    let obj = { ...capacity[0], ...usefulInfoCount[0] };
    return res.status(200).send(obj);
  }
};

const postBusCapacity = async (req, res) => {
  const busNo = req.params.busNo;
  const curCapcity = req.body.capacityLevel;

  if (curCapcity > 5 || curCapcity < 0) {
    return res.status(400).send("Invalid Capacity Info!");
  }

  try {
    BusCapacity.create({
      VehicleNo: busNo,
      Capacity: curCapcity,
      ReportTime: new Date(),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(busNo + "bus report failed!");
  }
  return res.status(200).send(busNo + "bus report successfully!");
};

module.exports = { getBusCapacity, postBusCapacity };
