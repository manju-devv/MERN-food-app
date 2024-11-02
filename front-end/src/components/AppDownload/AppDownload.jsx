import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For better experience download <br/> Tomato App</p>
      <div class="app-download-items">
        <img src={assets.play_store} />
        <img src={assets.app_store}/>
      </div>
    </div>
  )
}

export default AppDownload;
