import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

import "./app.css";
import { Outlet } from "react-router";
import ProductProvider from "./pages/inventory/ProductProvider";
import { LogIn } from "lucide-react";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <LogIn />
        <Sidebar />
        <Header />
        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default App;
