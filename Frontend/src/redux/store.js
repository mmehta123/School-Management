import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dashboardReducer from "./dashboard/dashboardSlice";
import userReducer from "./user/userSlice";

const persistConfigs = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  //only user state will be persisted not the dashboard items
  user: persistReducer(persistConfigs, userReducer),
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
