import React, { useContext, useEffect, useState } from 'react';
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopUp = () => {
  const {url,curstate,setCurrState,token,setToken,setShowLogin,showLogin} = useContext(StoreContext);

  
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  });
  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const handleSubmit = async (event) =>{
    event.preventDefault();
    let newUrl = url;
    if(curstate === 'SignUp'){
      newUrl += "/api/user/register"
    }
    else{
      newUrl += "/api/user/login"
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }
  }
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div className='login-popup'>
      <form onSubmit={handleSubmit} class="login-popup-container">
        <div class="login-popup-title">
          <h2>{curstate}</h2>
          <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
        </div>
        <div class="login-popup-inputs">
          {curstate==='Login'?'':<input name='name' value={data.name} onChange={onChangeHandler} type='text' placeholder='enter name' required/>}
          <input name='email' value={data.email} type="email" onChange={onChangeHandler} placeholder='enter email' required />
          <input name='password' value={data.password} onChange={onChangeHandler} type='password' placeholder='enter password' />
          <button type='submit'>{curstate==='SignUp'?'create account':'Login'}</button>
        </div>
        <div className='login-popup-conditions'>
          <input type='checkbox'/>
          <p>By contunuing,I agree to the terms and conditions.</p>
        </div>
        {curstate==='Login'?<p>dont have an account? <span onClick={()=>setCurrState('SignUp')}>SignUp here</span></p>:
        <p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
