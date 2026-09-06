import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./pages/dashboard/dashboard";
import Category from "./pages/category/category";
import Product from "./pages/product/product";
import ProductVariant from "./pages/product_varients/product_variant";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Inventory from "./pages/inventory/index.jsx";
import ProductGallery from "./pages/product_gallery/index.jsx";
import ProductUpdate from "./pages/product/ProductUpdate.jsx";
import Login from "./pages/Admin/login.jsx";
import Register from "./pages/Admin/register.jsx";
import PrivateRoute from "./components/middleware/PrivateRoute.jsx";
import ProductProvider from "./pages/inventory/ProductProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          
            <Dashboard />
          
        ),
      },
      {
        path: "/category",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "/product",
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: "/product_variant",
        element: (
          <PrivateRoute>
            <ProductVariant />
          </PrivateRoute>
        ),
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        ),
      },
      {
        path: "/product_gallery",
        element: (
          <PrivateRoute>
            <ProductGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/product_update",
        element: (
          <PrivateRoute>
            <ProductUpdate />
          </PrivateRoute>
        ),
      },
     
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
);
