import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { ProductContext } from "../inventory/ProductProvider";
const Logout = () => {
    const {logout}=useContext(ProductContext);
    const navigate =useNavigate();

     const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
   <>
   <Link to ="/">
   <button className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900" >
          <span className="text-yellow-600">⬅️</span>
          <span onClick={handleLogout}>Log Out</span></button>
   </Link>
   </>
  )
}

export default Logout