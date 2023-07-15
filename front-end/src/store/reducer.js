import { combineReducers } from 'redux';

// reducer import
import busyBusReducer from './BusyBusReducer';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
  busyBus: busyBusReducer.reducer
});

export default reducer;
