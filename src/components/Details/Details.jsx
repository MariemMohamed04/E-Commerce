import axios from "axios";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function Details() {
  let params = useParams();

  async function getProductDetails(id) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  let { data, isLoading } = useQuery("details", () =>
    getProductDetails(params.id)
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      {isLoading ? (
        <div className="vh-100  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#5ea184"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="row align-items-center my-5">
            <div className="col-md-3">
              <Slider {...settings}>
                {data?.data.data.images.map((img) => {
                  return <img src={img} className="w-100" alt={data?.data.title} />
                })}
              </Slider>
            </div>
            <div className="col-md-9">
              <h2 className="fw-bold">{data?.data.data.title}</h2>
              <p className="text-muted">{data?.data.data.description}</p>
              <p className="text-main">{data?.data.data.category.name}</p>
              <div className="d-flex justify-content-between py-3">
                <span>{data?.data.data.price}EGP</span>
                <span>
                  <i className="fa-solid fa-star rating-color"></i>
                  {data?.data.data.ratingsAverage}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
              <button className="btn bg-main text-light w-75">Add+</button>
              <i class="fa-solid fa-heart fs-2"></i>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}