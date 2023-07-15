import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer
});

export { store };
