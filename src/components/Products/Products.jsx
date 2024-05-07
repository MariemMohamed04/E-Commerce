import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { cartContext } from "../../context/cartContext";
import { wishlistContext } from "../../context/wishlistContext";
import toast from "react-hot-toast";

export default function Products(props) {

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Wishlist
  const [wishlistStatus, setWishlistStatus] = useState({});


  // Cart
  let { AddToCart } = useContext(cartContext)
  async function addTocart(id) {
    let { data } = await AddToCart(id)
    if (data.status == 'success') {
      toast.success(data.message)
    } else {
      toast.error('Product is not added to Cart')
    }
  }

  // Wishlist
  let { AddToWishlist } = useContext(wishlistContext)
  async function addTowishlist(id) {
    let { data } = await AddToWishlist(id)
    if (data.status == 'success') {
      toast.success(data.message)
    } else {
      toast.error('Product is not added to Wishlist')
    }
  }

  // Products
  async function getProduct() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery(
    "products",
    getProduct,
    { enabled: true, });
  console.log(data?.data.data);

  // Filter
  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <input
        type="text"
        className="w-75 form-control my-5 mx-auto"
        placeholder="Search... &#128270;"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
        <div className="row">
          {filteredProducts.map((product) => {
            const isProductInWishlist = wishlistStatus[product._id];
            return (
              <div className="col-lg-3 col-md-6" key={product._id}>
                <div className="product p-5 text-center">
                  <Link to={`/details/${product._id}`}>
                    <img src={product.imageCover} className="w-100" />
                    <p className="text-main">{product.category.name}</p>
                    <h6 className="text-muted">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h6>
                    <div className="d-flex justify-content-between py-3">
                      <span>{product.price}EGP</span>
                      <span>
                        <i className="fa-solid fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => { addTocart(product._id) }} className="btn bg-main text-light w-75">Add+</button>
                    <i onClick={() => {
                      addTowishlist(product._id);
                      setWishlistStatus({
                        ...wishlistStatus,
                        [product._id]: !isProductInWishlist,
                      });
                    }}
                      className={`heart fa-solid fa-heart fs-5 cursor-pointer ${isProductInWishlist ? "heart-color" : ""
                        }`}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
