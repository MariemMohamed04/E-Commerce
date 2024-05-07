import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  async function getCategory() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading } = useQuery('category', getCategory);

  return (
    <div className='content'>
      <Slider {...settings}>
        {data?.data.data.map((cat) => (
          <div key={cat.id}>
            <img src={cat.image} height={250} alt={cat.name} className='w-100' />
            <h3 className='fw-bolder text-center'>{cat.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
