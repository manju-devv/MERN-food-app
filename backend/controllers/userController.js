
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import userModel from '../models/userModel.js';

const loginUser = async (req,res) =>{
  const {email,password} = req.body;
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User Doesn't exist"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
     return res.json({success:false,message:"Invalid credentials entered!!"})
    }
    
    const token = createToken(user._id);
    return res.json({success:true,token})
    
  }catch(e){
    console.log(e)
    res.json({success:false,message:"Error occured"});
  }
}
const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
} 

const registerUser = async (req,res) => {
  const {name,email,password} = req.body;
  try{
    const exists = await userModel.findOne({email});
    if(exists){
      return res.json({success: false,message:"email already exists please login!!"})
    }
    if(!validator.isEmail(email)){
      return res.json({success: false,message:"Please enter a valid email"})
    }
    if(password.length<8){
      return res.json({success: false,message:"Please enter a strong password"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);
    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPass,
    });
    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})
  }catch(e){
    console.log(e);
    res.json({success:false,message:"some error occured"})
  }
}

export {loginUser,registerUser}


// {
//   "name":"anonymus",
//   "email":"user.anonymous@gmail.com",
//   "password":"12345678"
// }