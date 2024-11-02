import React, { useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [img,setImg] = useState(null);
  const [data,setData] = useState({
    name:'',
    description:'',
    category: 'salad',
    price: ''
  })
  function handle(e){
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const formHandle = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image",img)
    const response = await axios.post(`${url}/api/food/add`,formData)
    console.log(response)
    if(response.data.success){
      setData({
        name:'',
        description:'',
        category: 'salad',
        price: ''
      })
      setImg(null)
      toast.success(response.data.message)
    } else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    console.log(data)
  },[data]);
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={formHandle}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img className='upload-icon' src={img?URL.createObjectURL(img):assets.upload} alt=''/>
          </label>
          <input onChange={(e)=>setImg(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={handle} value={data.name} type='text' name='name' placeholder='type here'/>
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={handle} value={data.description} name='description' rows="6" placeholder='write comments here' />
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select onChange={handle} name='category'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>product Price</p>
            <input onChange={handle} value={data.price} type='number' name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
