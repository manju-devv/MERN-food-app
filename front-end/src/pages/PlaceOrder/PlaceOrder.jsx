import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const navigate = useNavigate();
  const{totalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  // const placeOrderr = async(e) => {
  //   e.preventDefault();
  //   const orderItems = [];
  //   food_list.map((item)=>{
  //     if(cartItems[item._id]>0){
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id];
  //       orderItems.push(itemInfo)
  //     }
  //   })
  const placeOrderr = async (e) => {
    e.preventDefault();
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items:orderItems,
      amount:totalCartAmount()+10
    }
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url); // Redirect to payment page
      } else {
        toast.success("order placed successfully!");
        navigate('/')
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };
  // const checkout = () =>{
  //   console.log("clicked")
  //   if(totalCartAmount()===0){
  //     alert('your cart is empty add some items')
  //   } else {
  //     alert('order placed successfully')
  //   }
  // }

  useEffect(()=>{
    if(!token){
      navigate('/');
      alert('please login to ur account')
    } else if(totalCartAmount()===0){
      navigate('/')
      alert('please add some items to cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrderr} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' required/>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Second name' required/>
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='enter email' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='street' required/>
        <div className='multi-fields'> 
          <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='city' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' required/>
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip-Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' required/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='phone' required/>
      </div>
      <div className='place-order-right'>
      <div className="cart-total">
            <h2>Cart totals</h2>
            <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{totalCartAmount()}₹</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{totalCartAmount()===0?0:10}₹</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{totalCartAmount()===0?0:totalCartAmount()+10}₹</b>
            </div>
            </div>
            <button type='submit'>proceed to Payment</button>   
          </div> 
      </div>
    </form>
  )
}

export default PlaceOrder
