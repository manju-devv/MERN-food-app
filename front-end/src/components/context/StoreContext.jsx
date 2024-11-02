import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null);


function StoreContextProvider({children}){
    
  const url = "http://localhost:4000";
  const [token,setToken] = useState("")
  const [curstate,setCurrState] = useState('SignUp');
  const [cartItems,setCartItems] = useState({});
  const [showLogin,setShowLogin] = useState(false);
  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    } else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  } 

  const removeFromCart = async (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }


  const totalCartAmount = ()=>{
    let amount = 0;
    for(const item in cartItems){
      console.log(item)
      if(cartItems[item]){
        const foodInfo = food_list.find((prod)=>prod._id===item)
        amount += foodInfo.price * cartItems[item];
      }
    }
    return amount;
  }

  const fetchFoodlist = async () => {
    const response = await axios.get(url+'/api/food/lists');
    setFoodList(response.data.data)
  }
  useEffect(()=>{
    console.log(cartItems)
    totalCartAmount()
  },[cartItems]);

    useEffect(()=>{
      async function loadData() {
        await fetchFoodlist()
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          await loadCartData(localStorage.getItem("token"))
        }
      }
      loadData()
    },[])
  
  const contextValue = {
      food_list,
      cartItems,
      addToCart,
      removeFromCart,
      totalCartAmount,
      url,
      curstate,
      setCurrState,
      token,
      setToken,
      showLogin,setShowLogin
    }

  return(
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )

}

export default StoreContextProvider;