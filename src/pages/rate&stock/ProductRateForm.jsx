import React, { useEffect, useState } from "react";

import {
  getPost,
  getProductVariants,
  postProductRate,
} from "../../api/PostApi";


const ProductRateForm = ({ data, setData }) => {

  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);

  const [formData, setFormData] = useState({
    rate: "",
    stock_level: "",
    product_id: "",
    product_variant_id: "",
  });


  // ==============================
  // GET DROPDOWN DATA
  // ==============================

  useEffect(() => {

    const getDropdownData = async () => {

      try {

        const productRes = await getPost();

        const productVariantRes =
          await getProductVariants();

        setProducts(productRes.data);

        setProductVariants(
          productVariantRes.data.data
        );

      } catch (error) {

        console.log(
          "Dropdown error:",
          error.response?.data || error.message
        );

      }

    };

    getDropdownData();

  }, []);


  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ==============================
  // ADD
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !formData.rate ||
      !formData.stock_level ||
      !formData.product_id ||
      !formData.product_variant_id
    ) {

      alert("Please fill all fields");

      return;

    }


    try {

      const payload = {

        rate: Number(formData.rate),

        stock_level: Number(
          formData.stock_level
        ),

        product_id: Number(
          formData.product_id
        ),

        product_variant_id: Number(
          formData.product_variant_id
        ),

      };


      const res = await postProductRate(
        payload
      );


      /*
       * Add newly created rate
       * to the table immediately.
       */
      setData((previous) => [
        ...previous,
        res.data,
      ]);


      // Clear form

      setFormData({
        rate: "",
        stock_level: "",
        product_id: "",
        product_variant_id: "",
      });


      alert("Product rate added successfully");


    } catch (error) {

      console.log(
        "Add rate error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.detail ||
          "Failed to add product rate"
      );

    }

  };


  // ==============================
  // CLEAR
  // ==============================

  const handleClear = () => {

    setFormData({
      rate: "",
      stock_level: "",
      product_id: "",
      product_variant_id: "",
    });

  };


  return (

    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* RATE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate
          </label>

          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            placeholder="Enter Rate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

        </div>


        {/* STOCK */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>

          <input
            type="number"
            name="stock_level"
            value={formData.stock_level}
            onChange={handleChange}
            placeholder="Enter Quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

        </div>


        {/* PRODUCT */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product
          </label>

          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
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
                {product.id}, {product.name}
              </option>

            ))}

          </select>

        </div>


        {/* PRODUCT VARIANT */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Variant
          </label>

          <select
            name="product_variant_id"
            value={formData.product_variant_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
          >

            <option value="">
              Select Product Variant
            </option>

            {productVariants.map(
              (productVariant) => (

                <option
                  key={productVariant.id}
                  value={productVariant.id}
                >

                  {productVariant.id},{" "}
                  {productVariant.variant_name},{" "}
                  {productVariant.variant_value}

                </option>

              )
            )}

          </select>

        </div>

      </div>


      {/* BUTTONS */}

      <div className="flex gap-4 mt-8">

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md"
        >
          Add Product Rate
        </button>


        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-md"
        >
          Clear
        </button>

      </div>

    </form>

  );
};


export default ProductRateForm;