import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/Store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorPrimary: "#FF3C00" } }}>
        <AppRoutes />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
