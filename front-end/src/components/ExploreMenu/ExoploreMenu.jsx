import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExoploreMenu = ({cat,setCat}) => {
  console.log(cat)
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>choose your diverse menu featuring a detectable array of dishes with the flourishing taste and explore variety of dishes that you have never tasted before.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
          return (
            <div onClick={()=>{setCat(prev=>prev===item.menu_name?'':item.menu_name)}} key={index} className='explore-menu-list-item'>
              <img className={cat===item.menu_name?'active':''} src={item.menu_image} alt='food-image'/>
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExoploreMenu;
