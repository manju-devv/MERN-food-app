import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import { StoreContext } from './components/context/StoreContext';
import Check from './pages/CheckVerify/Check';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  const{showLogin,setShowLogin} = useContext(StoreContext);

  return (
    <div>
      <ToastContainer />
      {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/verify' element={<Check />}/>
          <Route path='/userorders' element={<Orders />}/>
        </Routes>
      </div>
      <Footer />
    </div>

  )
}

export default App;
