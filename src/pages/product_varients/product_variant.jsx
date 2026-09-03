import React, { useState } from 'react';

const ProductVariant = () => {
  // State for all form fields
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    price: '0.00',
    stockQuantity: '0',
    category: '',
    productImage: null,
    description: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  // Clear form
  const handleClear = () => {
    setFormData({
      productName: '',
      sku: '',
      price: '0.00',
      stockQuantity: '0',
      category: '',
      productImage: null,
      description: ''
    });
  };

  // Placeholder submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Product Added!');
  };

  return (
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Product Variant</h1>
          <p className="text-gray-500 mt-1">Manage your Product Variant</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
          Go to Inventory List
        </button>
      </div>

      {/* Form Container */}
      <div className="border border-gray-300 rounded-lg p-6 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter variant name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              />

            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant Type</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter variant type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variant Value</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Enter variant value"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 bg-white"
              >
                <option value="">Select Product</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Product Image */}
         

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductVariant;