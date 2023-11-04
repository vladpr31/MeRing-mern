import {
  configureStore,
  combineReducers,
  createImmutableStateInvariantMiddleware,
  createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import AuthReducer from "./Reducers/authReducer";
import UserReducer from "./Reducers/userReducer";
import DoctorReducer from "./Reducers/doctorReducer";
import ClinicsReducer from "./Reducers/clinicReducer";
import ChatReducer from "./Reducers/chatReducer";
import SocketReducer from "./Reducers/socketReducer";

const persistSocketConfig = {
  key: "socket",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const chatsPersistConfig = {
  key: "chats",
  storage,
};
const doctorsPersistConfig = {
  key: "doctors",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, UserReducer);
const persistedChatsReducer = persistReducer(chatsPersistConfig, ChatReducer);
const persistedDoctorReducer = persistReducer(
  doctorsPersistConfig,
  DoctorReducer
);
const persistedSocketReducer = persistReducer(
  persistSocketConfig,
  SocketReducer
);
const rootReducer = combineReducers({
  auth: AuthReducer,
  doctors: persistedDoctorReducer,
  clinics: ClinicsReducer,
  user: persistedUserReducer,
  chats: persistedChatsReducer,
  socket: persistedSocketReducer,
});

export const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  {},
  compose(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
