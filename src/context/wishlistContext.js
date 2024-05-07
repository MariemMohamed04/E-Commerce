import axios from "axios";
import { createContext } from "react";

export let wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let baseUrl = `https://ecommerce.routemisr.com`
  let headers = {token: localStorage.getItem('userToken')}

  function AddToWishlist(id) {
    return axios.post(`${baseUrl}/api/v1/wishlist`,
      {
        productId: id
      },
      {
        headers: headers
      }
    )
  }

  function getLoggedUserWishlist() {
    return axios.get(`${baseUrl}/api/v1/wishlist`,
      {
        headers: headers
      }
    )
  }

  function removeItem(id) {
    return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: headers
      }
    )
  }

  return <wishlistContext.Provider value={{AddToWishlist, getLoggedUserWishlist, removeItem}}>
    {props.children}
  </wishlistContext.Provider>

}