


import React, { useContext } from 'react';
import './FoodDetails.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDetails = ({cat}) => {

  const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h3>Top dishes near you</h3>
      <div className='food-display-items'>
        {food_list.map((item,index)=>{
          {console.log(`cat is ${cat}`,`item cat is ${item.category}`)}
          if(cat===''||cat===item.category){
            return(
              <FoodItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description}/>
            )
          }
        })}
      </div>
    </div>
  )
}

export default FoodDetails;
