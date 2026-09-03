import React, { useState } from 'react';

const ProductGallery = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Add Product Image</h1>
          <p className="text-gray-500 mt-1">Manage your Product Image</p>
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
            

            {/* SKU */}
           

            {/* Price */}
            
           

            {/* Stock Quantity */}
            

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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-gray-100 file:text-gray-700
                  hover:file:bg-gray-200"
              />
            </div>

            {/* Description */}
            
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

export default ProductGallery;