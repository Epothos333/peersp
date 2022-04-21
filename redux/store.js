import { configureStore } from '@reduxjs/toolkit';
import picsSlice from './slices/picsSlice';

export default configureStore({
    reducer: {
      pics: picsSlice,
    },
  });
