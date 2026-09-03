import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../inventory/ProductProvider';
import ProductForm from './ProductForm';

const ProductUpdate = ( ) => {
   const {updateDataApi,SetUpdateDataApi}=useContext(ProductContext);
  
  // const [addData, setAddData] = useState({
  //         name:"",
  //         slug:"",
  //         category_id:"",
  //         price:"",
  //         stock_level:"",
  //         description:""
  //     })

  

  return (
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Update Product</h1>
          <p className="text-gray-500 mt-1">Update your product</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
          Go to Inventory List
        </button>
      </div>

      {/* Form Container */}
      <div className="border border-gray-300 rounded-lg p-6 bg-white">
        <ProductForm updateDataApi={updateDataApi} SetUpdateDataApi={SetUpdateDataApi} />
      </div>
    </div>
  );
};

export default ProductUpdate;