import React, { useState } from 'react';
import './Home.css'
import Header from '../../components/Header/Header';
import ExoploreMenu from '../../components/ExploreMenu/ExoploreMenu';
import FoodDetails from '../../components/FoodDetails/FoodDetails';
import AppDownload from '../../components/AppDownload/AppDownload';


const Home = () => {

  const [category,setCategory] = useState('');

  return (
    <div>
      <Header />
      <ExoploreMenu cat={category} setCat={setCategory}/>
      <FoodDetails cat={category}/>
      <AppDownload />
    </div>
  )
}

export default Home
