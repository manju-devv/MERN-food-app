import mongoose from "mongoose";

const url = "mongodb+srv://manju:9666702088@cluster0.9btnx.mongodb.net/food-app";

export const connectDB = async () =>{
  await mongoose.connect(url).then(()=>{
    console.log("database connected")
    console.log(process.env.JWT_SECRET)
  });
}