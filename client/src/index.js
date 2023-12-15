import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./lang/i18n";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "./style/GlobalStyle";
import io from "socket.io-client";
import i18n from "./lang/i18n";
// import 'setimmediate';


const socket = io.connect("http://localhost:3000");

const root = ReactDOM.createRoot(document.getElementById("root"));

if (typeof setImmediate === 'undefined') {
  const setImmed = require('setimmediate');
  global.setImmediate = setImmed.setImmediate;
  global.clearImmediate = setImmed.clearImmediate;
}

root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <LanguageProvider> */}
          <App />
          <GlobalStyle />
        {/* </LanguageProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>

);
