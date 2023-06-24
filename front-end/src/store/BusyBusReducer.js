// action - state management
// import * as actionTypes from './actionTypes';
import { createSlice } from '@reduxjs/toolkit';
import dummyBusStopData from './bus_stops.json';
import { BUS_CAPACITY_LEVEL } from './constant';
import { v4 as uuidv4 } from 'uuid';

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
    selectedBusId: ''
  },
  passenger: {
    busesNearBy: [],
    currentBus: {},
    latitude: '',
    longtitude: ''
  }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const busyBusSlice = createSlice({
  name: 'groceries',
  initialState: initialState,
  reducers: {
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    getBusRoutebyName: (state) => {
      state.commuter.busRoutesSearchResult = [
        {
          route: '049'
        }
      ];
    },
    getBusStopsbyRoute: (state, action) => {
      const data = dummyBusStopData.stops.filter((busStop) => busStop.Routes.includes(action.payload));
      state.commuter.busStopsSearchResult = data;
    },
    clearUpcomingBuses: (state) => {
      state.commuter.busStopsSearchResult = [];
    },
    getUpcomingBusesbyBusStop: (state) => {
      state.commuter.upComingBuses = {
        49: [
          {
            id: uuidv4(),
            estimateTime: 2,
            capacity: BUS_CAPACITY_LEVEL.FULL
          },
          {
            id: uuidv4(),
            estimateTime: 11,
            capacity: BUS_CAPACITY_LEVEL.FULL
          }
        ],
        R4: [
          {
            id: uuidv4(),
            estimateTime: 5,
            capacity: BUS_CAPACITY_LEVEL.BUSY
          }
        ]
      };
    }
  }
});

export default busyBusSlice;
// should be modified to busyBusSlice.reducer once the reducers are moved to extraReducers
