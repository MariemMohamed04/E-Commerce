import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from 'react-helmet';


export default function Brands() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const openModal = (brand) => {
    setSelectedBrand(brand);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBrand(null);
    setModalOpen(false);
  };

  async function getBrand() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery("brand", getBrand,
    {
      enabled: true,
    });
  console.log(data?.data.data);

  return (
    <div className='content'>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className='text-center'>
        <h2 className='my-5 fw-bolder'>All Brands</h2>
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
              {data?.data.data.map((brand) => {
                return (
                  <div key={brand.id} className="col-lg-3 col-md-6">
                    <div className="card product">
                    <img
                      src={brand.image}
                      className="card-img-top w-100"
                      style={{ width: '100%', height: '300px' }}
                      alt={brand.name}
                      onClick={() => openModal(brand)}
                    />
                      <div className="card-body">
                        <p className="card-text fw-bold fs-3">
                          {brand.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Modal */}
        {selectedBrand && (
          <div
            className={`modal fade bg-dark bg-opacity-50 ${modalOpen ? 'show' : ''}`}
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden={!modalOpen}
            style={{ display: modalOpen ? 'block' : 'none' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {selectedBrand.name}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-md-6">
                        <h1>{selectedBrand.name}</h1>
                        <p>{selectedBrand.name}</p>
                      </div>
                      <div className="col-md-6">
                        <img
                          src={selectedBrand.image}
                          className="img-fluid"
                          alt={selectedBrand.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






