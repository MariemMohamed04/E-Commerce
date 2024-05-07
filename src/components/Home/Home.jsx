import React, { useContext } from 'react';
import Products from '../Products/Products';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../mainSlider/mainSlider';
import {Helmet} from "react-helmet";
import { counterContext } from '../../context/counterContext';

export default function Home() {
  return (
    <div className='content'>
    {/* <p>{count}</p>
    <button className="btn btn-danger" onClick={() => {changeCount()}}>Change</button> */}
          <Helmet>
                <title>Home</title>
            </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </div>
  )
}
