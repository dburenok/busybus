import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { BUS_CAPACITY_LEVEL } from './constants';
import { fetchRoutesAsync, fetchStopsOnRouteAsync } from './thunks';

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  opened: false,
  commuter: {
    busRoutesSearchResult: [],
    busStopsSearchResult: [],
    selectedRoute: '',
    selectedBusStopNum: '',
    upComingBuses: {},
    selectedBusId: '',
    availableRoutes: []
  },
  passenger: {
    busesNearBy: [],
    currentBus: {},
    latitude: '',
    longitude: ''
  }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
const busyBusSlice = createSlice({
  name: 'busyBus',
  initialState: initialState,
  reducers: {
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    clearUpcomingBuses: (state) => {
      state.commuter.busStopsSearchResult = [];
    },
    getUpcomingBusesByBusStop: (state) => {
      state.commuter.upComingBuses = {
        49: [
          {
            id: uuid(),
            estimateTime: 2,
            capacity: BUS_CAPACITY_LEVEL.FULL
          },
          {
            id: uuid(),
            estimateTime: 11,
            capacity: BUS_CAPACITY_LEVEL.FULL
          }
        ],
        R4: [
          {
            id: uuid(),
            estimateTime: 5,
            capacity: BUS_CAPACITY_LEVEL.BUSY
          }
        ]
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoutesAsync.fulfilled, (state, action) => {
      state.commuter.availableRoutes = action.payload.map((route) => ({ route: route['RouteNo'] }));
    });
    builder.addCase(fetchStopsOnRouteAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.commuter.busStopsSearchResult = action.payload;
    });
  }
});

export default busyBusSlice;
// should be modified to busyBusSlice.reducer once the reducers are moved to extraReducers
