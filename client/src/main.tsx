import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { App } from "./app/app.tsx";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
