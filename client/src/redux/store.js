// client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 비직렬화 가능성 체크 비활성화
    }),
});

const persistor = persistStore(store);

export { store, persistor };
