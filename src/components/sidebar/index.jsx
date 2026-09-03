import React, { useContext } from 'react';
import { Link } from 'react-router';
import Logout from '../../pages/Admin/Logout';
import { ProductContext } from '../../pages/inventory/ProductProvider';

const Sidebar = () => {
  const {data,}=useContext(ProductContext)
  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
        <div className="bg-orange-500 text-white p-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">InApp</h1>
          <p className="text-xs text-gray-500">Inventory App</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {/* MAIN Section */}
        <div className="text-xs font-semibold text-gray-400 uppercase px-6 mb-2">Main</div>
        
        <Link to="/dashboard">
        <div className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
       
          <span className="text-orange-500">🏠</span>
          <span>Dashboard</span></div>

        </Link>
        
        <Link to="/inventory" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
        
     
          <span>📦</span>
          <span>Inventory</span>
        </Link>

      <Link to="/product" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
       
          <span className="text-purple-500">➕</span>
          <span>Add Product</span>
        </Link>


        <Link to="/category" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
       
          <span className="text-purple-500">➕</span>
          <span>Add Category</span>
        </Link>

        <Link to="/product_variant" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
       
          <span className="text-purple-500">➕</span>
          <span>Add Product Variant</span>
        </Link>

        <Link to="/product_gallery" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
       
          <span className="text-purple-500">🎴</span>
          <span>Product Gallery</span>
        </Link>
        
        <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
          <span className="text-blue-500">📊</span>
          <span>Reports</span>
        </a>

        

        {/* ACCOUNT Section */}

        <div className="text-xs font-semibold text-gray-400 uppercase px-6 mt-6 mb-2">Account</div>
        {data?(<Logout/>):(

          <><Link to="/"className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900" >
          <span className="text-yellow-600">🔑</span>
          <span>Log in</span></Link>
        
        

        <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
          <span className="text-purple-700">👤</span>
          <span>Sign up</span>
        </a></>
        )}
        
      
      
        
      </nav>
    </aside>
  );
};

export default Sidebar;