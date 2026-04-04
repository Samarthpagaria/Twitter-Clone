import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import "./index.css";
import Profile from "./components/Profile.js";
import Bookmarks from "./components/Bookmarks.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed.js";
import Explore from "./components/Explore.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Feed />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
