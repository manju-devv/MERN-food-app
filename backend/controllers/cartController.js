import userModel from "../models/userModel.js"




//add to cart
const addToCart = async (req,res)=>{
  try{
    let userData = await userModel.findById(req.body.userId);
    console.log(userData);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1;
    } else{
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"added to cart"})
  } catch(e){
    console.log(e)
    res.json({success:false,message:"error arised"})
  }
}

//remove from cart 
const removeFromCart = async (req,res) => {
  try{
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
      cartData[req.body.itemId] -= 1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"removed item from cart"})
  }catch(e){
    console.log(e)
    res.json({success:false,message:"some error occured"})
  }
}

//get cart
const getCartItems = async (req,res) => {
  try{
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch(e){

  }
}

export {addToCart,removeFromCart,getCartItems}