import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer,

  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
