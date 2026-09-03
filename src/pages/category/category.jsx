import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { deleteCategory, getCategory } from '../../api/PostApi';
import CategoryForm from './CategoryForm';

const Category = () => {

const [data,setData]=useState([]);

const getCategoryData=async()=>{
  const response=await getCategory();
  setData(response.data.data)
  console.log(response);
}

 useEffect(()=>{
  getCategoryData();
 },[]);

 const handleDeleteCategory= async(id)=>{

  try {
    const res= await deleteCategory(id)
    if (res.status===200){
      const newCategory=data.filter((curPost)=>{
        return curPost.id != id
      });
      setData(newCategory);
    }
  } catch (error) {
    console.log(error)
  }

 }

  return (
    <>
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Category</h1>
          <p className="text-gray-500 mt-1">Manage your Category</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
          Go to Inventory List
        </button>
      </div>

      {/* Form Container */}
      <div className="border border-gray-300 rounded-lg p-6 bg-white">
      <CategoryForm data={data} setData={setData} />
      </div>

      
     {/* Table */}
    
      <div className="bg-white border mt-20 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
             {
              data.map((curElem)=>{
                const {id,name,slug}= curElem;
                return<tr key={id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                                        {id}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{slug}</td>

                                    <td className="px-6 py-4 text-sm">
                                      <div className="flex gap-3">
                                        <Link to="/product_update"  >
                                        <button className="text-gray-400 hover:text-gray-600" >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button></Link> 
                                        <button className="text-red-400 hover:text-red-600" onClick={()=>handleDeleteCategory(id)}>
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                
              })
             }

            </tbody>
          </table>
        </div>
      </div>
    </div>

    </>
  );
};

export default Category;