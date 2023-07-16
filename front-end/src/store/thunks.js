import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_ROUTES, FETCH_BUSES_ON_STOP, FETCH_STOP_ON_ROUTE } from './actionTypes';
import BusyBusService from './service';

export const fetchRoutesAsync = createAsyncThunk(FETCH_ROUTES, async () => {
  return await BusyBusService.fetchRoutes();
});

export const fetchStopsOnRouteAsync = createAsyncThunk(FETCH_STOP_ON_ROUTE, async ({ routeNo }) => {
  return await BusyBusService.fetchStopsOnRoute({ routeNo });
});

export const fetchBusesOnStopAsync = createAsyncThunk(FETCH_BUSES_ON_STOP, async ({ busStop }) => {
  return await BusyBusService.fetchBusesOnStop({ busStop });
});
