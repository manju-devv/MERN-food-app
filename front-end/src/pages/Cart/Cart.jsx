import React, { useContext } from 'react';
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext';
import { Link } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart,totalCartAmount,url} = useContext(StoreContext)

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]){
            return(
              <div>
                  <div className="cart-items-title cart-items-item">
                  <img src={url+'/images/'+item.image}/>
                  <p>{item.name}</p>
                  <p>{item.price}₹</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{cartItems[item._id]*item.price}₹</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr/>
              </div>
            )
          }
        })}
      </div>
        <div className="cart-bottom">
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
            <Link to='/order'><button>proceed to checkout</button></Link>
          </div>
          <div className='cart-promo-code'>
            <div>
              <p>if u have promo-code,enter here!</p>
              <div className='cart-promo-code-input'>
                <input type='text' placeholder='promo code'/>
                <button className='butt'>submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart
