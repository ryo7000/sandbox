import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import { config, localStorageProvider } from "./config";
import App from "./App";

const provider = localStorageProvider();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => provider, ...config }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
