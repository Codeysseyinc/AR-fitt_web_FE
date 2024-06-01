import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";

// Configuration object for Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage method (default is localStorage)
  // You can add other configurations here, like whitelist, blacklist, etc.
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
