import api from "../core/utils/http";




// const getConfig = () => {
//   const token = localStorage.getItem("token");

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

//get method (all products)
export const getPost = () => {
  return api.get("/products/all_products");
};

// delete method to delete the products

export const deleteProduct = (id) => {
  return api.delete(`/products/delete/${id}`);
};

// Create product

export const createProduct = (post) => {
  return api.post("/products/create_product", post);
};

// update product

export const updateProduct = (id, post) => {
  return api.put(`/products/update/${id}`, post);
};

export const adminLogin = (credentials) => {
  return api.post("/users/login", credentials);
};


// get categoty

export const getCategories=()=>{
  return api.get("/categories/all_category")
}

// delete category

export const deleteCategory=(id)=>{
  return api.delete(`/categories/delete_category/${id}`);
}

// post category

export const postCategory=(post)=>{
  return api.post("/categories/create_category",post);
}

export const updateCategory=(id,post)=>{
  return api.put(`/categories/update_category/${id}`,post)
}

//Product variants

//get

export const getProductVariants=()=>{
  return api.get("/products_varients/all_product_varients")
}

// post
export const postProductVariant=(post)=>{
  return api.post("/products_varients/create_product_varients",post)
}

//update

export const updateProductVariant=(id,post)=>{
  return api.put(`/products_varients/update_product_varient/${id}`,post)
}

//delete
export const deleteProductVarient=(id)=>{
  return api .delete(`/products_varients/delete_product_varient/${id}`)
}

// Product Gallery

//get
export const getProductImage=(id)=>{
  return api.get(`/products/get_images/${id}`)
}

//post
export const postProductImage=(id,post)=>{
  return api.post(`/products/upload/${id}`,post)
}

//delete
export const deleteProductImage=(id)=>{
  return api.delete(`/products/delete_image/${id}`)
}

// get all images
export const getAllImages=()=>{
  return api.get("/products/all_images")
}

// Product Rates CURD

// get all product rates
export const getProductRate=()=>{
  return api.get("/products/all_rates")
}

// post  products rates

export const postProductRate=(post)=>{
  return api.post("/products/add_rates",post)
}

// update  products rates 

export const updateProductRate=(product_id,product_variant_id,post)=>{
  return api.put(`/products/update_rates/${product_id}/${product_variant_id}`,post)
}

// delete products rates
export const deleteProductsRate=(product_id,product_variant_id)=>{
  return api.delete(`/products/delete_rates/${product_id}/${product_variant_id}`)
}
