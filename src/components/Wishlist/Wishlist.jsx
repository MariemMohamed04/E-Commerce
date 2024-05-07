import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { wishlistContext } from '../../context/wishlistContext';
import Products from '../Products/Products';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const [details, setDetails] = useState("");
  const [wishlistDetails, setWishlist] = useState([]); // Initialize as an empty array
  let { getLoggedUserWishlist, removeItem, AddToWishlist } = useContext(wishlistContext);

  async function getWishlistItem() {
    try {
      const { data } = await getLoggedUserWishlist();
      if (data && data.data && data.data.products) {
        console.log(data.data);
        setDetails(data?.data);
        setWishlist(data?.data.products);
      }
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  }

  async function deleteItem(id) {
    try {
      const { data } = await removeItem(id);
      if (data && data.data && data.data.products) {
        console.log(data.data.products);
        setWishlist(data.data.products);
      }
    } catch (error) {
      console.error('Error deleting item from wishlist:', error);
    }
  }
  
  async function addTowishlist(id) {
    try {
      const { data } = await AddToWishlist(id);
      if (data.status === 'success') {
        // Add the new wishlist item to the existing wishlist data
        const newWishlistData = [...wishlistDetails, data.data.product];
  
        // Update the wishlistDetails state with the new data
        setWishlist(newWishlistData);
  
        // Log the updated wishlistDetails for debugging
        console.log(newWishlistData);
      } else {
        toast.error('Product is not added to Wishlist');
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  }

  useEffect(() => {getWishlistItem();}, []);

  return (
    <div className="content">
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <div className="bg-main-light my-5 p-5">
      <div>
  <h2>Shop Wishlist</h2>
  <p>You have {wishlistDetails.length} items in your wishlist.</p>
</div>
        {wishlistDetails.length > 0 ? ( 
          wishlistDetails.map((product) => {
            return (
              <div key={product._id}>
                {product.count !== 0 ? (
                  <div className="row my-3 border-bottom py-3">
                    <div className="col-md-1">
                      <img
                        src={product?.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-11 d-flex justify-content-between align-items-center">
                      <div>
                        <h6>
                          {product.product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>
                        <p className="text-main">{product.product.category.name}</p>
                        <p>Price:{product.price}EGP</p>
                        <button
                          onClick={() => { deleteItem(product.product._id) }}
                          className="btn btn-outline-danger"
                        >
                          <i className="fa-regular fa-trash-can mx-2"></i>Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          })
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>      
  )  
}
