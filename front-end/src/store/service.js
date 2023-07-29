const API_URL = 'https://busybus-back-end.onrender.com';

const fetchRoutes = async () => {
  const response = await fetch(`${API_URL}/routes`, {
    method: 'GET'
  });

  return response.json();
};

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

const BusyBusService = {
  fetchRoutes,
  fetchStopsOnRoute,
  fetchBusesOnRoute,
  fetchStopRouteEstimates,
  fetchBusCapacity,
  reportBusCapacity
};

export default BusyBusService;
