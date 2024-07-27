import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://himanshu:himanshu@nextblogs.b1qgdjc.mongodb.net/next-blog-app');
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
