import React, { useEffect, useState } from "react";

import ProductRateForm from "./ProductRateForm";

import {
  getProductRate,
  deleteProductsRate,
  updateProductRate,
} from "../../api/PostApi";


const ProductRate = () => {

  const [data, setData] = useState([]);

  // Which product is expanded
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Which variant is being edited
  const [editingVariant, setEditingVariant] = useState(null);

  // Update form values
  const [editForm, setEditForm] = useState({
    rate: "",
    stock_level: "",
  });

  const [loading, setLoading] = useState(false);



  // GET ALL RATES
  

  const getProductRateData = async () => {

    try {

      setLoading(true);

      const res = await getProductRate();

      setData(res.data.data || []);

    } catch (error) {

      console.log(
        "Get rates error:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getProductRateData();

  }, []);


 
  // GROUP PRODUCTS


  const groupedProducts = data.reduce((groups, item) => {

    if (!groups[item.product_id]) {

      groups[item.product_id] = {
        product_id: item.product_id,
        product_name: item.product_name,
        variants: [],
      };

    }

    groups[item.product_id].variants.push(item);

    return groups;

  }, {});



  // OPEN / CLOSE PRODUCT


  const toggleProduct = (productId) => {

    if (expandedProduct === productId) {

      setExpandedProduct(null);

    } else {

      setExpandedProduct(productId);

    }

  };


  
  // EDIT BUTTON

  const handleEdit = (variant) => {

    setEditingVariant(variant.id);

    setEditForm({
      rate: variant.rate,
      stock_level: variant.stock_level,
    });

  };


  // EDIT INPUT

  const handleEditChange = (e) => {

    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // SAVE CHANGES

  const handleSaveChanges = async (variant) => {

    try {

      const payload = {

        rate: Number(editForm.rate),

        stock_level: Number(
          editForm.stock_level
        ),

        // Your AddRates Pydantic schema
        product_id: variant.product_id,

        product_variant_id:
          variant.product_variant_id,

      };


      const res = await updateProductRate(

        variant.product_id,

        variant.product_variant_id,

        payload

      );


      // Update table immediately
      setData((previous) =>

        previous.map((item) =>

          item.id === variant.id

            ? {
                ...item,
                rate: res.data.rate,
                stock_level:
                  res.data.stock_level,
              }

            : item

        )

      );


      // Close update form
      setEditingVariant(null);

      setEditForm({
        rate: "",
        stock_level: "",
      });


      alert("Rate updated successfully");


    } catch (error) {

      console.log(
        "Update error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.detail ||
          "Failed to update rate"
      );

    }

  };


  // DELETE

  const handleDelete = async (variant) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this rate?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteProductsRate(

        variant.product_id,

        variant.product_variant_id

      );


      // Remove only this exact rate
      setData((previous) =>

        previous.filter(
          (item) => item.id !== variant.id
        )

      );


      // Close edit form if needed
      if (editingVariant === variant.id) {

        setEditingVariant(null);

      }


      alert("Rate deleted successfully");


    } catch (error) {

      console.log(
        "Delete error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.detail ||
          "Failed to delete rate"
      );

    }

  };


  // CANCEL EDIT

  const handleCancelEdit = () => {

    setEditingVariant(null);

    setEditForm({
      rate: "",
      stock_level: "",
    });

  };


  return (

    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">


      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Product Rate & Stock
          </h1>

          <p className="text-gray-500 mt-1">
            Manage product rates and stock
          </p>

        </div>


        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Go to Inventory List
        </button>

      </div>


      {/* ADD FORM */}

      <div className="border border-gray-300 rounded-lg p-6 bg-white">

        <ProductRateForm
          data={data}
          setData={setData}
        />

      </div>


      {/* PRODUCT TABLE */}

      <div className="bg-white border mt-10 border-gray-200 rounded-lg overflow-hidden">

        <div className="p-6 ">

          <h2 className="text-xl font-semibold text-gray-800">
            Products
          </h2>

        </div>


        <div className="overflow-x-auto">

          <table className="min-w-full">



            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Product ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Product Name
                </th>

                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody>


              {loading ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center py-8"
                  >
                    Loading...
                  </td>

                </tr>

              ) : Object.values(groupedProducts).length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center py-8 text-gray-500"
                  >
                    No product rates found
                  </td>

                </tr>

              ) : (

                Object.values(groupedProducts).map(
                  (product) => (

                    <React.Fragment
                      key={product.product_id}
                    >


                   
                      {/* PRODUCT ROW */}
                      

                      <tr className="border-b border-gray-200 hover:bg-gray-50">

                        <td className="px-6 py-5 font-medium text-gray-900">

                          {product.product_id}

                        </td>


                        <td className="px-6 py-5 font-semibold text-gray-900">

                          {product.product_name}

                        </td>


                        <td className="px-6 py-5 text-center">

                          <button
                            onClick={() =>
                              toggleProduct(
                                product.product_id
                              )
                            }
                            className="p-2 rounded-full hover:bg-gray-200"
                          >

                            <svg
                              className={`w-5 h-5 transition-transform ${
                                expandedProduct ===
                                product.product_id
                                  ? "rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />

                            </svg>

                          </button>

                        </td>

                      </tr>


                      {/* ================================= */}
                      {/* VARIANTS */}
                      {/* ================================= */}

                      {expandedProduct ===
                        product.product_id && (

                        <tr>

                          <td
                            colSpan="3"
                            className="bg-gray-50 px-6 py-4"
                          >

                            <div className="space-y-3">


                              {product.variants.map(
                                (variant) => (

                                  <div
                                    key={variant.id}
                                    className="bg-white border border-gray-200 rounded-lg"
                                  >


                                    {/* VARIANT ROW */}

                                    <div className="flex items-center justify-between p-4">


                                      {/* Variant information */}

                                      <div>

                                        <div className="font-semibold text-gray-900">

                                          {variant.variant_name}

                                          {variant.variant_value && (
                                            <span className="ml-2 text-gray-500">
                                              ({variant.variant_value})
                                            </span>
                                          )}

                                        </div>


                                        <div className="flex gap-6 mt-2 text-sm">

                                          <span>
                                            <span className="text-gray-500">
                                              Rate:
                                            </span>{" "}

                                            <span className="font-medium">
                                              Rs. {variant.rate}
                                            </span>
                                          </span>


                                          <span>
                                            <span className="text-gray-500">
                                              Stock:
                                            </span>{" "}

                                            <span className="font-medium">
                                              {variant.stock_level}
                                            </span>
                                          </span>

                                        </div>

                                      </div>


                                      {/* Buttons */}

                                      <div className="flex gap-3">

                                        <button
                                          onClick={() =>
                                            handleEdit(
                                              variant
                                            )
                                          }
                                          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                                        >
                                          Edit
                                        </button>


                                        <button
                                          onClick={() =>
                                            handleDelete(
                                              variant
                                            )
                                          }
                                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                        >
                                          Delete
                                        </button>

                                      </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* INLINE UPDATE FORM */}
                                    {/* ================================= */}

                                    {editingVariant ===
                                      variant.id && (

                                      <div className="border-t bg-blue-50 p-5">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                          {/* PRICE */}

                                          <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Price
                                            </label>

                                            <input
                                              type="number"
                                              name="rate"
                                              value={
                                                editForm.rate
                                              }
                                              onChange={
                                                handleEditChange
                                              }
                                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />

                                          </div>


                                          {/* STOCK */}

                                          <div>

                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Stock Level
                                            </label>

                                            <input
                                              type="number"
                                              name="stock_level"
                                              value={
                                                editForm.stock_level
                                              }
                                              onChange={
                                                handleEditChange
                                              }
                                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />

                                          </div>

                                        </div>


                                        {/* SAVE / CANCEL */}

                                        <div className="flex gap-3 mt-5">

                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleSaveChanges(
                                                variant
                                              )
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md"
                                          >
                                            Save Changes
                                          </button>


                                          <button
                                            type="button"
                                            onClick={
                                              handleCancelEdit
                                            }
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md"
                                          >
                                            Cancel
                                          </button>

                                        </div>

                                      </div>

                                    )}

                                  </div>

                                )
                              )}

                            </div>

                          </td>

                        </tr>

                      )}

                    </React.Fragment>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default ProductRate;