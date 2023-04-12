import authReducer from './slices/auth';
import messageReducer from './slices/message';
import settingsReducer from './slices/settings';
import mapModalsReducer from './slices/mapModals';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from './services/baseApi';
import { errorLogger } from './middlewares/errorLogger';
import { osmApi } from './services/osm.service';

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  settings: settingsReducer,
  mapModals: mapModalsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [osmApi.reducerPath]: osmApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      osmApi.middleware,
      errorLogger,
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
