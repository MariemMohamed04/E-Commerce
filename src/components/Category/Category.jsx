import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from 'react-helmet';


export default function Category() {

  async function getCategory() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery("category", getCategory,
    {
      enabled: true,
    });
  console.log(data?.data.data);

  return (
    <div className='content'>
          <Helmet>
        <title>Categories</title>
      </Helmet>
    <div className='text-center'>
      <h2 className='my-5 fw-bolder'>All Categories</h2>
      {
        isLoading ? (
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
          <div className="row g-4">
          {data?.data.data.map((cat) => {
            return (
              <div key={cat.id} className="col-md-4">
                <div className="card product">
                  <img
                    src={cat.image}
                    className="card-img-top w-100"
                    style={{ width: '100%', height: '300px' }}
                    alt={cat.name}
                  />
                  <div className="card-body">
                    <p className="card-text fw-bold fs-3">
                      {cat.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )
      }
    </div>
    </div>
  );
}
