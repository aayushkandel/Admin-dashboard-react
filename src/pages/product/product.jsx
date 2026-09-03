import React, { useState, useEffect, useContext } from "react";
import { data, Link } from "react-router";
import ProductForm from "./ProductForm";
import { getPost } from "../../api/PostApi";
import { ProductContext } from "../inventory/ProductProvider";

const Product = () => {
  const { data, setData } = useContext(ProductContext);

  return (
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Produuct</h1>
          <p className="text-gray-500 mt-1">Manage your product</p>
        </div>
        <Link to="/inventory">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
            Go to Inventory List
          </button>
        </Link>
      </div>

      {/* Form Container */}
      <div className="border border-gray-300 rounded-lg p-6 bg-white">
        <ProductForm data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Product;
