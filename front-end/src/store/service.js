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

const BusyBusService = {
  fetchRoutes,
  fetchStopsOnRoute
};

export default BusyBusService;
