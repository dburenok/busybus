import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_ROUTES,
  FETCH_BUSES_ON_ROUTE,
  FETCH_STOP_ON_ROUTE,
  FETCH_ESTIMATE,
  FETCH_BUS_CAPACITY,
  REPORT_BUS_CAPACITY,
  FETCH_CLOSEST_BUS_STOP
} from './actionTypes';
import BusyBusService from './service';

export const fetchRoutesAsync = createAsyncThunk(FETCH_ROUTES, async () => {
  return await BusyBusService.fetchRoutes();
});

export const fetchStopsOnRouteAsync = createAsyncThunk(FETCH_STOP_ON_ROUTE, async ({ routeNo }) => {
  return await BusyBusService.fetchStopsOnRoute({ routeNo });
});

export const fetchBusesOnRouteAsync = createAsyncThunk(FETCH_BUSES_ON_ROUTE, async ({ selectedRoute }) => {
  return await BusyBusService.fetchBusesOnRoute({ selectedRoute });
});

export const fetchStopRouteEstimatesAsync = createAsyncThunk(FETCH_ESTIMATE, async ({ busStop, selectedRoute }) => {
  return await BusyBusService.fetchStopRouteEstimates({ busStop, selectedRoute });
});

export const fetchBusCapacityAsync = createAsyncThunk(FETCH_BUS_CAPACITY, async ({ busNo }) => {
  return await BusyBusService.fetchBusCapacity({ busNo });
});

export const fetchClosestBusStopAsync = createAsyncThunk(FETCH_CLOSEST_BUS_STOP, async ({ latitude, longitude, selectedRoute }) => {
  return await BusyBusService.fetchClosestBusStop({ latitude, longitude, selectedRoute });
});

export const reportBusCapacityAysnc = createAsyncThunk(REPORT_BUS_CAPACITY, async ({ busNo, capacityLevel }) => {
  return await BusyBusService.reportBusCapacity({ busNo, capacityLevel });
});
