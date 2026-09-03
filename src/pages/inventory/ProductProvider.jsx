import React, {  createContext, useEffect, useState } from "react";
import { adminLogin, getPost } from "../../api/PostApi";
import api from "../../core/utils/http";


export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [admin,setAdmin]=useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updateDataApi, setUpdateDataApi] = useState({
    name: "",
    slug: "",
    category_id: "",
    price: "",
    stock_level: "",
    description: "",
  });

  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const checkAuth=async()=>{
         const token = localStorage.getItem("token");
         if (!token) {
          setLoading(false);
          return;
         }
         try {
          // axios.defaults.headers.common["Authorization"]=`Bearer ${token}`

          

          setAdmin(token);

          await getPostData();

         } catch (error) {
          console.log("Authentication Failed:",error.response?.data);

          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];

          setAdmin(null);
          setData([]);
         }finally{
          setLoading(false);
         }
    };
    checkAuth()
   
  }, []);



  const authLogin = async (credentials) => {
    try {
      const response = await adminLogin(credentials);

      console.log("LOGIN RESPONSE:", response.data);

      const { token } = response.data;

      localStorage.setItem("token", token);
    

      setAdmin(response);
      
      return {
      success: true,
      };
    } catch (error) {
      console.log("STATUS:", error);
      console.log("ERROR:", error.response?.data);
      return {
        success: false,
        message: error.response?.data?.detail ?? "Something went wrong!",
      };
    } finally {
      setLoading(false);
    }
  };

  //Logout

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setAdmin(null);
    setData([]);
  };

  return (
    <ProductContext.Provider
      value={{
        admin,
        setAdmin,
        data,
        setData,
        updateDataApi,
        setUpdateDataApi,
        getPostData,
        authLogin,
        loading,
        logout,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
