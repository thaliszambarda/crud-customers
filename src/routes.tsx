import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { NotFound } from "./pages/404";
import { Customers } from "./pages/dashboard/customers";
import { ReadCustomer } from "./pages/dashboard/read-customer";
import { RegisterCustomer } from "./pages/dashboard/register-customer";
import { UpdateCustomer } from "./pages/dashboard/update-customer";
import { Error } from "./pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Navigate to="/clientes" replace />,
      },
      {
        path: "/clientes",
        element: <Customers />,
      },
      {
        path: "/cadastrar-cliente",
        element: <RegisterCustomer />,
      },
      {
        path: "/editar-cliente/:id",
        element: <UpdateCustomer />,
      },
      {
        path: "/cliente/:id",
        element: <ReadCustomer />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
