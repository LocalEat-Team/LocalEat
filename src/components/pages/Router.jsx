import React from "react";

import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "panier",
      element: <Home />,
    },
    {
      path: "compte",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};