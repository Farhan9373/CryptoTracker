import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const connector=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb connected:${connector.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error:",error);
    }
}