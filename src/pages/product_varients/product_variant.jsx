import React, { useState,useEffect } from 'react';
import ProductVariantForm from './ProductVariantForm';
import { deleteProductVarient, getProductVariants } from '../../api/PostApi';

const ProductVariant = () => {
  const [data,setData]=useState([]);
  
  const [updateDataApi, setUpdateDataApi] = useState({});
  
  const getproductVariantData=async()=>{
    const response=await getProductVariants();
    setData(response.data.data)
    console.log(response);
  }
  
  let isEmpty =  Object.keys(updateDataApi).length === 0;
  
   useEffect(()=>{
    getproductVariantData();
   },[]);
  
   const handleDeleteProductVariant= async(id)=>{
  
    try {
      const res= await deleteProductVarient(id)
      if (res.status===200){
        const newProductVariant=data.filter((curPost)=>{
          return curPost.id != id
        });
        setData(newProductVariant);
      }
    } catch (error) {
      console.log(error)
    }
  
   }
   
     const handleUpdatePost=(curElem)=> setUpdateDataApi(curElem);
  
  

  return (
    <div className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{isEmpty ? "Add Product Variant" : "Edit Product Variant"}</h1>
          <p className="text-gray-500 mt-1">Manage your Product Variant</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition">
          Go to Inventory List
        </button>
      </div>

      {/* Form Container */}
      <div className="border border-gray-300 rounded-lg p-6 bg-white">
       <ProductVariantForm data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
      </div>
       <div className="bg-white border mt-20 border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
             {
              data.map((curElem)=>{
                const {id,variant_name,variant_value}= curElem;
                return<tr key={id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                                        {id}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{variant_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{variant_value}</td>

                                    <td className="px-6 py-4 text-sm">
                                      <div className="flex gap-3">
                                       
                                        <button className="text-gray-400 hover:text-gray-600" onClick={()=>handleUpdatePost(curElem)} >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                        <button className="text-red-400 hover:text-red-600" onClick={()=>handleDeleteProductVariant(id)}>
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
  );
};

export default ProductVariant;