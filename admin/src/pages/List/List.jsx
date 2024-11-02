import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list,setList] = useState([]);
  const fetchData = async() => {
    const response = await axios.get(`${url}/api/food/lists`);
    if(response.data.success){
      setList(response.data.data)
      // toast.success("fetched successfully")
    }else{
      toast.error("error")
    }
  }
  const removeItem = async (foodId) => {
    const resp = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchData();
    if(resp.data.success){
      toast.success(resp.data.message)
    }else{
      toast.error("Something Went Wrong")
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className='list-table-format' key={index}>
              <img src={`${url}/images/`+item.image}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}$</p>
              <p className='cursor' onClick={()=>removeItem(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
