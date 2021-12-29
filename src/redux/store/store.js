import { configureStore } from '@reduxjs/toolkit';
import selectedElementReducer from '../slices/appSlice';

export default configureStore({
  reducer: {
    ElementReducer: selectedElementReducer
  },
})