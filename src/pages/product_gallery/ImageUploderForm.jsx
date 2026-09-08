import React, { useEffect, useState } from "react";
import { getPost, postProductImage } from "../../api/PostApi";

const ImageUploderForm = ({refreshImages}) => {

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  // Get products for dropdown
  useEffect(() => {

    const getDropdownData = async () => {

      try {

        const productRes = await getPost();

        console.log("PRODUCT RESPONSE:", productRes.data);

        setProducts(productRes.data);

      } catch (error) {

        console.log(
          "Dropdown error:",
          error.response?.data || error.message
        );

      }

    };

    getDropdownData();

  }, []);


  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!productId) {
      alert("Please select a product");
      return;
    }

    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await postProductImage(
        productId,
        formData
      );

      console.log(res.data);

      await refreshImages();

      alert("Images uploaded successfully");

      setProductId("");
      setImages([]);

      e.target.reset();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Failed to upload images"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Product Dropdown */}

        <div className="md:col-span-2">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product
          </label>

          <select
            name="product_id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
          >

            <option value="">
              Select Product
            </option>

            {products.map((product) => (

              <option
                key={product.id}
                value={product.id}
              >
                {product.id} - {product.name}
              </option>

            ))}

          </select>

        </div>


        {/* Images */}

        <div className="md:col-span-2">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>

          <input
            type="file"
            name="images"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-gray-100 file:text-gray-700
              hover:file:bg-gray-200"
          />

          <p className="text-xs text-gray-500 mt-2">
            Select one or more JPG, JPEG or PNG images.
          </p>

        </div>


        {/* Preview */}

        {images.length > 0 && (

          <div className="md:col-span-2">

            <p className="text-sm font-medium text-gray-700 mb-3">
              Selected Images: {images.length}
            </p>

            <div className="flex flex-wrap gap-4">

              {images.map((image, index) => (

                <div
                  key={index}
                  className="border rounded-lg p-2"
                >

                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  <p className="text-xs text-gray-500 mt-1 w-24 truncate">
                    {image.name}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>


      {/* Buttons */}

      <div className="flex gap-4 mt-8">

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium px-6 py-2 rounded-md transition"
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>

        <button
          type="button"
          onClick={() => {
            setProductId("");
            setImages([]);
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-md transition"
        >
          Clear
        </button>

      </div>

    </form>

  );
};

export default ImageUploderForm;