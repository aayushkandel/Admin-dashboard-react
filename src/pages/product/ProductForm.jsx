import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../api/PostApi";

const ProductForm = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    name: "",
    slug: "",
    category_id: "",
    price: "",
    stock_level: "",
    description: ""
  });

  let isEmpty = !updateDataApi || Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        name: updateDataApi.name || "",
        slug: updateDataApi.slug || "",
        category_id: updateDataApi.category_id || "",
        price: updateDataApi.price || "",
        stock_level: updateDataApi.stock_level || "",
        description: updateDataApi.description || "",
      });
  }, [updateDataApi]);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    try {
      const res = await createProduct(addData);

      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({
          name: "",
          slug: "",
          category_id: "",
          price: "",
          stock_level: "",
          description: "",
        });
        alert("Product created successfully");
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateProduct(updateDataApi.id, addData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add Product") {
      addPostData();
    } else if (action == "Edit Product") {
      updatePostData();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={addData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={addData.slug}
              onChange={handleInputChange}
              placeholder="Enter Slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={addData.price}
              onChange={handleInputChange}
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock_level"
              value={addData.stock_level}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="number"
              name="category_id"
              value={addData.category_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 bg-white"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={addData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 resize-y"
            ></textarea>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            value={isEmpty ? "Add Product" : "Edit Product"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
          >
            {isEmpty ? "Add Product" : "Edit Product"}
          </button>
          <button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
