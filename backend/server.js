import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import dotenv from 'dotenv';

const app = express();
const port = 4000;
// dotenv.config()

//middleWares
app.use(express.json());
app.use(cors());

//database connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
  res.status(200).send("welcome to Api")
});

app.listen(port,()=>{
  console.log(`server running on http://localhost:${port}`)
});



/* app.post("/api/food/add",upload.single("image"),(req,res)=>{
  let image_filename = `${req.file.filename}`
  const food = new foodModel({
    name:req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  })
  try{
    await food.save();
    res.json({sucess:true,message:"food added"})
  }catch(error){
    console.log(error);
    res.json({sucess:false,message:"error lol"})
  }
}
 }) */