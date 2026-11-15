import mongoose from "mongoose";

const url = "mongodb+srv://manju:DhfoTV3bxfF24uUj@cluster0.9btnx.mongodb.net/?appName=Cluster0/food-app";

export const connectDB = async () =>{
  await mongoose.connect(url).then(()=>{
    console.log("database connected")
    console.log(process.env.JWT_SECRET)
  });
}
