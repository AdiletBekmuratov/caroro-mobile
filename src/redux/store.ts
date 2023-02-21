import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import settingsReducer from "./slices/settings";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import { errorLogger } from "./middlewares/errorLogger";
import { unauthApi } from "./services/unauth.service";

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  settings: settingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [unauthApi.reducerPath]: unauthApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      unauthApi.middleware,
      errorLogger
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;