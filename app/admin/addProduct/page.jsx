'use client'

import { assets } from "@/assets/assets"
import axios from "axios";
import Image from "next/image"
import { useState, useCallback} from "react"
import { toast } from "react-toastify";

const Page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
        category: "Startup",
        author: "John Doe",
        authorImg: '/author.png',
    });

    const onChangeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }, []);

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authorImg);
        formData.append('image', image);
        const res = await axios.post('/api/blog',formData);
        if(res.data.success){
            toast.success(res.data.message);
            setImage(false);
            setData({
                title: "",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
                category: "Startup",
                author: "John Doe",
                authorImg: '/author.png',
            })
        } else {
            toast.error("Error adding blog");
        }

    }

    const imageUrl = image ? URL.createObjectURL(image) : assets.upload_area;


    return (
        <>
            <form className="pt-5 px-5 sm:pt-12 pl-16" onSubmit={onSubmitHandler}>
                <p className="text-xl">Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className="mt-4" src={imageUrl} width={140} height={70} alt="" />
                </label>
                <input onChange={onImageChange} type="file" id="image" hidden required />
                <p className="text-xl mt-4">Blog title</p>
                <input name="title" onChange={onChangeHandler} value={data.title} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="Type here" required />
                <p className="text-xl mt-4">Blog Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" rows={6} placeholder="Write content here" required />
                <p className="text-xl mt-4">Blog Category</p>
                <select name="category" onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-3 border text-gray-500">
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br></br>
                <button className="mt-8 w-40 h-12 bg-black text-white" type="submit">Add</button>
            </form>
        </>
    );
};

export default Page;
