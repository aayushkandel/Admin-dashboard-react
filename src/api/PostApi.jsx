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

export const getCategory=()=>{
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