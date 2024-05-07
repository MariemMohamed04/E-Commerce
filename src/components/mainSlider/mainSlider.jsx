import React from 'react';
import Slider from 'react-slick';
import img1 from './../../assets/img/slider-image-1.jpeg'
import img2 from './../../assets/img/slider-image-2.jpeg'
import img3 from './../../assets/img/slider-image-3.jpeg'
import img4 from './../../assets/img/grocery-banner-2.jpeg'
import img5 from './../../assets/img/grocery-banner.png'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
    <div className='content'>
      <div className="row my-5 gx-0">
      <div className="col-md-9">
        <Slider {...settings}>
          <img height={400} src={img1} className='w-100' />
          <img height={400} src={img2} className='w-100' />
          <img height={400} src={img3} className='w-100' />
        </Slider>
      </div>
      <div className="col-md-2">
        <img src={img4} className='w-100' height={200} />
        <img src={img5} className='w-100' height={200} />
      </div>
    </div>
    </div>
    </>
  );
}
