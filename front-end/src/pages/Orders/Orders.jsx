import React, { useState,useEffect } from 'react';
import './Orders.css'

const Orders = () => {
  const [visible, setVisible] = useState(true);

    useEffect(()=>{
      const timer = setTimeout(()=>{
        setVisible(false)
      },500)
      return () => clearTimeout(timer)
    },[])

  return (
    <div>
      {visible && <div className='spinner'></div>}
      <h1>your orders..</h1>
    </div>
  )
}

export default Orders;
