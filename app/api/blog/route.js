// This is an Server / API component

import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
const fs = require("fs");
import {writeFile} from 'fs/promises';
const loadDB = async()=>{
    await connectDB();
}

loadDB();

// API Endpoint for getting all blogs
export async function GET(request){
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({blog})
    } else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs})
    }
    
}

// API Endpoint for uploading blogs
export async function POST(request){
    const formData = await request.formData();
    const timeStamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`
    await writeFile(path, buffer);
    const imageUrl = `/${timeStamp}_${image.name}`;
    const blogData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imageUrl}`,
        authorImg:`${formData.get('authorImg')}`
    }
    await BlogModel.create(blogData);
    console.log("Blog saved successfully");
    return NextResponse.json({success:true,message:"Blog Added successfully"})
}

// delete blog

export async function DELETE(request){
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        fs.unlink(`./public${blog.image}`,()=>{});
        await BlogModel.findByIdAndDelete(blogId);
        return NextResponse.json({success:true,message:"Blog deleted successfully"})
    }
}