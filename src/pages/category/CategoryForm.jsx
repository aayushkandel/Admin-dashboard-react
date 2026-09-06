import React, { useState, useEffect } from "react";
import { postCategory, updateCategory } from "../../api/PostApi";

const CategoryForm = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  let isEmpty =  Object.keys(updateDataApi).length === 0;
  useEffect(() => {
    updateDataApi &&
      setAddData({
        name: updateDataApi.name || "",
        slug: updateDataApi.slug || "",
        description: updateDataApi.description || "",
      });
  }, [updateDataApi]);


const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postCategory(addData);
    if (res.status === 200) {
      setData([...data, res.data]);
      setAddData({
        name: "",
        slug: "",
        description: "",
      });
    }
  };
  const updatePostData= async()=>{
    try {
      const res= await updateCategory(updateDataApi.id,addData);
      console.log(res);
      
      if(res.status === 200){
        setData((prev)=>{
          return prev.map((curElem)=>{
            return curElem.id === res.data.id ? res.data : curElem;
          })
        })
        setAddData({
          name: "",
          slug: "",
          description: "",
        });
        setUpdateDataApi({});
    }
  } catch (error) {
    console.log(error);
  }
}

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action= e.nativeEvent.submitter.value;
    if(action==="Add Category"){
      addPostData();
    }else if(action==="Edit Category"){
      updatePostData();
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={addData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={addData.slug}
              onChange={handleInputChange}
              placeholder="Category Slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={addData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 resize-y"
            ></textarea>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            value={isEmpty ? "Add Category" : "Edit Category"}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
          >
            {isEmpty ? "Add Category" : "Edit Category"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
