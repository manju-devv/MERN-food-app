import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env)

const frontend_url = "https://localhost:5173"
//placing order from frontend 
const placeOrder = async (req,res) => {
  try{
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    // const line_items = req.body.items.map((item)=>({
    //   price_data:{
    //     currency:"inr",
    //     product_data:{
    //       name:item.name
    //     },
    //     unit_amount:item.price*100*60
    //   },
    //   quantity:item.quantity
    // }))

    // line_items.push({
    //   price_data:{
    //     currency:"inr",
    //     product_data:{
    //       name:"delivery charges"
    //     },
    //     unit_amount:2*100*60
    //   },
    //   quantity:1
    // })
    // const paymentRequest = {
    //   line_items:line_items,
    //   mode:'payment',
    //   redirect_url: `${frontend_url}/verify?orderId=${newOrder._id}`,
    //   webhook: `${frontend_url}/webhook`, // Optional: Use webhook for payment status
    // };

    // const response = await axios.post(
    //   `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
    //   paymentRequest,
    //   {
    //     headers: {
    //       "X-Api-Key": process.env.INSTAMOJO_API_KEY,
    //       "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
    //     },
    //   }
    // );
// Prepare the Instamojo payment request
  const paymentRequest = {
    amount: req.body.amount + 2, // Adding delivery fee
    purpose: "Order Payment", // Payment purpose description
    buyer_name: `${req.body.address.firstName} ${req.body.address.lastName}`,
    email: req.body.address.email,
    phone: req.body.address.phone,
    redirect_url: `${frontend_url}/verify?orderId=${newOrder._id}`, // Redirect URL
  };

  // Make the API call to Instamojo
  const response = await axios.post(
    `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
    paymentRequest,
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );
    // const session = await stripe.checkout.sessions.create({
    //   line_items:line_items,
    //   mode:'payment',
    //   success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    //   cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    // })
    res.json({success:true,session_url:response.data.payment_request.longurl,})
  } catch(e){
    console.log(e)
    res.json({success:false,message:"error"})
  }
}
const verifyOrder = async(req,res) =>{
  const {orderId,success} = req.body
  try{
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"paid"})
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"not paid"})
    }
  }catch(e){
    console.log(err)
    res.json({success:false,message:"something went wrong"})
  }
  
}
 
export {placeOrder,verifyOrder};