const fetchRoutes = async () => {
  const response = await fetch('http://localhost:3001/routes', {
    method: 'GET'
  });

  return response.json();
};

const fetchStopsOnRoute = async ({ routeNo }) => {
  const response = await fetch(`http://localhost:3001/routes/${routeNo}`, {
    method: 'GET'
  });

  return response.json();
};

const fetchBusesOnStop = async ({ busStop }) => {
  const stopNo = busStop['StopNo'];
  const response = await fetch(`http://localhost:3001/stops/${stopNo}/buses`, {
    method: 'GET'
  });

  return response.json();
};

const fetchStopRouteEstimates = async ({ busStop, selectedRoute }) => {
  const stopNo = busStop['StopNo'];
  const response = await fetch(`http://localhost:3001/estimates/${stopNo}/${selectedRoute}`, {
    method: 'GET'
  });

  return response.json();
};

const BusyBusService = {
  fetchRoutes,
  fetchStopsOnRoute,
  fetchBusesOnStop,
  fetchStopRouteEstimates
};

export default BusyBusService;
