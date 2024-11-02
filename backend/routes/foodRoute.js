import express from "express";
import multer from "multer";
import { addFood,foodList,remFood } from "../controllers/foodController.js";



const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})
const upload = multer({storage:storage})  //const upload = multer({storage:storage}).single("image")


foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/lists",foodList);
foodRouter.post("/remove",remFood);

export default foodRouter;