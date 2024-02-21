const LOCAL_API_URL = 'http://localhost:3001';
const DEPLOYED_API_URL = 'https://busybus-back-end.onrender.com';
const API_URL = process.env.REACT_APP_BUSY_BUS_ENV === 'dev' ? LOCAL_API_URL : DEPLOYED_API_URL;
const Routes = require('../routes.json');
console.log('Using API', API_URL);

const fetchRoutes = () => Routes;

const fetchStopsOnRoute = async ({ routeNo }) => {
  const response = await fetch(`${API_URL}/routes/${routeNo}`, {
    method: 'GET'
  });

  return response.json();
};

const fetchBusesOnRoute = async ({ selectedRoute }) => {
  const response = await fetch(`${API_URL}/routes/${selectedRoute}/buses`, {
    method: 'GET'
  });

  return response.json();
};

const fetchStopRouteEstimates = async ({ busStop, selectedRoute }) => {
  const stopNo = busStop['StopNo'];
  const response = await fetch(`${API_URL}/estimates/${stopNo}/${selectedRoute}`, {
    method: 'GET'
  });

  return response.json();
};

const fetchBusCapacity = async ({ busNo }) => {
  const response = await fetch(`${API_URL}/capacity/${busNo}`, {
    method: 'GET'
  });

  return response.json();
};

const reportBusCapacity = async ({ busNo, capacityLevel }) => {
  const response = await fetch(`${API_URL}/capacity/${busNo}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ capacityLevel: capacityLevel })
  });

  return response.json();
};

const fetchClosestBusStop = async ({ latitude, longitude, selectedRoute }) => {
  const response = await fetch(`${API_URL}/stops/${latitude}/${longitude}/${selectedRoute}`, {
    method: 'GET'
  });

  return response.json();
};

const BusyBusService = {
  fetchRoutes,
  fetchStopsOnRoute,
  fetchBusesOnRoute,
  fetchStopRouteEstimates,
  fetchBusCapacity,
  fetchClosestBusStop,
  reportBusCapacity
};

export default BusyBusService;
