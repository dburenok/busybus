import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { BUS_CAPACITY_LEVEL } from './constants';
import { fetchBusesOnStopAsync, fetchRoutesAsync, fetchStopsOnRouteAsync } from './thunks';

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
    availableRoutes: [],
    busesToShow: []
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
    setShowSidebar: (state, action) => {
      state.opened = action.payload;
    },
    clearStopsAndBuses: (state) => {
      state.commuter.busStopsSearchResult = [];
      state.commuter.busesToShow = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoutesAsync.fulfilled, (state, action) => {
      state.commuter.availableRoutes = action.payload.map((route) => ({ route: route['RouteNo'] }));
    });
    builder.addCase(fetchStopsOnRouteAsync.fulfilled, (state, action) => {
      state.commuter.busStopsSearchResult = action.payload;
    });
    builder.addCase(fetchBusesOnStopAsync.fulfilled, (state, action) => {
      state.commuter.busesToShow = action.payload;
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
    });
  }
});

export default busyBusSlice;
// should be modified to busyBusSlice.reducer once the reducers are moved to extraReducers
