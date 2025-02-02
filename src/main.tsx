import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/Store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorPrimary: "#FF3C00" } }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
