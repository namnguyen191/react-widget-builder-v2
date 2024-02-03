import { configureStore } from '@reduxjs/toolkit';
import { transformationReducer } from './features/transformation-editor-v2/transformationSlice';
import { TRANSFORMATION_STATE_KEY } from './storeHooks';

export const store = configureStore({
  reducer: {
    [TRANSFORMATION_STATE_KEY]: transformationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
