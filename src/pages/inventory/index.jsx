import React, { useState,useContext ,useEffect} from 'react';
import { deleteProduct, getPost } from '../../api/PostApi';
import { Link } from 'react-router';
import { ProductContext } from './ProductProvider';




const Inventory = () => {

const {admin,data,setData,setUpdateDataApi,getPostData}=useContext(ProductContext);

  
useEffect(() => {
  if (admin){
    getPostData();
  }

  }, [admin]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = data.filter((datas) => 
    datas.id.toString().includes(searchTerm)||
    datas.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    datas.category.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  // Delete function 
  const handleDeletePost = async (id)=>{
    try{
        const res =await deleteProduct(id)
        if (res.status=== 200){
          const newUpdatedPosts= data.filter((curPost)=>{
            return curPost.id !== id;
          });
          setData(newUpdatedPosts)
        }
    }
    catch (error){
      console.log(error)
    }
    
  };

  const handleUpdatePost=(curElem)=> {setUpdateDataApi(curElem)};


  return (
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
        />
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293a1 1 0 01-.293-.707V4z"></path></svg>
            Filter
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Excel
          </button>
          
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProducts.map((curElem) => {
                const {id,name,category,slug,price,stock_level}= curElem;
                
                
                return <tr key={id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                      {id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{price}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{stock_level}</td>
                  
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-3">
                      <Link to="/product_update"  >
                      <button className="text-gray-400 hover:text-gray-600" onClick={() => handleUpdatePost(curElem)} >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button></Link> 
                      <button className="text-red-400 hover:text-red-600" onClick={()=> handleDeletePost(id)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <p className="text-gray-500 text-sm">Showing product per page</p>
        
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed" disabled>Previous</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded-md font-medium">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;