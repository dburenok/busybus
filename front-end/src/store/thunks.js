import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_BUS_ROUTES, SEARCH_BUS_ROUTE } from './actionTypes';
import BusyBusService from './service';

export const fetchRoutesAsync = createAsyncThunk(FETCH_BUS_ROUTES, async () => {
  return await BusyBusService.fetchRoutes();
});

export const fetchStopsOnRouteAsync = createAsyncThunk(SEARCH_BUS_ROUTE, async ({ routeNo }) => {
  return await BusyBusService.fetchStopsOnRoute({ routeNo });
});
