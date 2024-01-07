import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import "./index.css";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth.jsx";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1022432154770-1tr9lri3not0nm28g546kvt1akm3rnnu.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
