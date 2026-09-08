
import React, { useEffect, useState } from 'react';
import ImageUploderForm from './ImageUploderForm';

import {deleteProductImage, getAllImages} from '../../api/PostApi';


const ProductGallery = () => {

  const [data, setData] = useState([]);


  // Get all gallery data
  const getPostData = async () => {

    try {
      const res = await getAllImages();
      console.log(res.data);

      setData(res.data);

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    getPostData();
  }, []);


  // Delete individual image
  const handleDelete = async (imageId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteProductImage(imageId);
      // Refresh gallery
      getPostData();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.detail ||
        "Failed to delete image"
      );

    }

  };


  return (

    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">


      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Add Product Image
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your Product Image
          </p>

        </div>


        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Go to Inventory List
        </button>

      </div>



      {/* Upload Form */}

      <div className="border border-gray-300 rounded-lg p-6 bg-white">

        <ImageUploderForm  refreshImages={getPostData}/>

      </div>



      {/* Gallery Table */}

      <div className="bg-white border mt-20 border-gray-200 rounded-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-gray-200">


            {/* Table Header */}

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Images
                </th>

              </tr>

            </thead>



            {/* Table Body */}

            <tbody className="bg-white divide-y divide-gray-100">


              {data.map((product) => (

                <tr
                  key={product.product_id}
                  className="hover:bg-gray-50"
                >


                  {/* Product ID */}

                  <td className="px-6 py-4 whitespace-nowrap">

                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-xl">

                      {product.product_id}

                    </div>

                  </td>



                  {/* Product Name */}

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">

                    {product.product_name}

                  </td>



                  {/* Images */}

                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-4">


                      {product.images.map((image) => (

                        <div
                          key={image.id}
                          className="relative border border-gray-200 rounded-lg p-2 flex items-center gap-2"
                        >


                          {/* Image */}

                          <img
                            src={`http://127.0.0.1:8000/${image.image}`}
                            alt={product.product_name}
                            className="w-24 h-24 object-cover rounded-md"
                          />



                          {/* Delete */}

                          <button
                            onClick={() => handleDelete(image.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete image"
                          >

                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />

                            </svg>

                          </button>

                        </div>

                      ))}


                    </div>

                  </td>


                </tr>

              ))}


            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};


export default ProductGallery;

