import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { addMessage } from "../slices/message";
import { AppDispatch } from "../store";
/**
 * Log a warning and show a toast!
 */
export const errorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      let error = action.payload ?? action.error;
      const dispatch = api.dispatch as AppDispatch;

      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.message) ||
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.detail) ||
        error?.message ||
        error?.data?.message ||
        JSON.stringify(error, null, 2);

      dispatch(addMessage(message));
    }

    return next(action);
  };
