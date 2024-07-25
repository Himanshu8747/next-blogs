'use client'

import BlogTableItem from "@/Components/BlogTableItem"
import { useState,useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
const Page = () => {
  const [ blogs,setBlogs] = useState([]);

  const fetchBlogs = async()=>{
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  }

  const deleteBlog = async(mongoId)=>{
    const response = await axios.delete('/api/blog',{params:{id:mongoId}});
    if(response.data.success){
      toast.success(response.data.message);
      setBlogs(blogs.filter(blog=>blog._id!==mongoId));
    }else{
      toast.error("Error deleting blog");
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item,index)=>{
              return <BlogTableItem deleteBlog={deleteBlog} author={item.author} mongoId={item._id} title={item.title} authorImg={item.authorImg} date={item.date} key={index}/>
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page