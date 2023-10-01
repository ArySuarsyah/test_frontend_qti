import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userData from "./userData";

const userConfig = {
  key: "userData",
  storage,
};

const reducer = combineReducers({
  userData :  persistReducer(userConfig, userData)
});

export default reducer;
