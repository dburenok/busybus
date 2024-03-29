import { createSlice } from '@reduxjs/toolkit';
// import { v4 as uuid } from 'uuid';
// import { BUS_CAPACITY_LEVEL } from './constants';
import {
  fetchBusesOnRouteAsync,
  fetchRoutesAsync,
  fetchStopRouteEstimatesAsync,
  fetchStopsOnRouteAsync,
  fetchBusCapacityAsync,
  fetchClosestBusStopAsync
} from './thunks';

export const initialState = {
  defaultId: 'default',
  opened: false,
  busPopupOpened: false,
  showBusStopOnly: true,
  commuter: {
    busRoutesSearchResult: [],
    busStopsSearchResult: [],
    selectedRoute: '',
    selectedBusStop: {},
    stopRoutesList: [],
    selectedBusId: '',
    selectedBusCapacity: 0,
    availableRoutes: [],
    busesToShow: [],
    estimates: [],
    closestBusStop: {}
  },
  passenger: {
    busesNearBy: [],
    currentBus: {},
    latitude: '',
    longitude: ''
  }
};

const busyBusSlice = createSlice({
  name: 'busyBus',
  initialState: initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.opened = action.payload;
    },
    setShowBusPopUp: (state, action) => {
      state.busPopupOpened = action.payload;
    },
    clearStopsAndBuses: (state) => {
      state.commuter.busStopsSearchResult = [];
      state.commuter.busesToShow = [];
    },
    setSelectedRoute: (state, action) => {
      state.commuter.selectedRoute = action.payload;
    },
    setSelectedBusStop: (state, action) => {
      state.commuter.selectedBusStop = action.payload;
    },
    setShowBusStopOnly: (state, action) => {
      state.showBusStopOnly = action.payload;
    },
    setClosestBusStop: (state, action) => {
      state.commuter.closestBusStop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoutesAsync.fulfilled, (state, action) => {
      state.commuter.availableRoutes = action.payload.map((route) => ({ route: route['RouteNo'] }));
    });
    builder.addCase(fetchStopsOnRouteAsync.fulfilled, (state, action) => {
      state.commuter.busStopsSearchResult = action.payload;
    });
    builder.addCase(fetchBusesOnRouteAsync.fulfilled, (state, action) => {
      state.commuter.busesToShow = action.payload;
      state.commuter.stopRoutesList = getRoutesFromBuses(action.payload);
    });
    builder.addCase(fetchStopRouteEstimatesAsync.fulfilled, (state, action) => {
      state.commuter.estimates = action.payload;
    });
    builder.addCase(fetchBusCapacityAsync.fulfilled, (state, action) => {
      state.commuter.selectedBusCapacity = action.payload;
    });
    builder.addCase(fetchBusCapacityAsync.rejected, (state) => {
      state.commuter.selectedBusCapacity = -1;
    });
    builder.addCase(fetchClosestBusStopAsync.fulfilled, (state, action) => {
      state.commuter.closestBusStop = action.payload;
    });
  }
});

export default busyBusSlice;

function getRoutesFromBuses(buses) {
  const routes = buses.map((bus) => bus['RouteNo']);
  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((route) => ({ route }));
}
