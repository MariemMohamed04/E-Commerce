import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let cartContext = createContext()

export default function CartContextProvider(props) {
  let baseUrl = `https://ecommerce.routemisr.com`
  let headers = { token: localStorage.getItem('userToken') }

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount !== null) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  function AddToCart(id) {
    return axios.post(
      `${baseUrl}/api/v1/cart`,
      { productId: id },
      { headers: headers }
    )
      .then((response) => {
        setCartCount((prevCount) => {
          const newCount = prevCount + 1;
          return newCount;
        });
        return response;
      });
  }

  function getLoggedUserCart() {
    return axios.get(`${baseUrl}/api/v1/cart`,
      { headers: headers }
    )
  }

  function removeItem(id) {
    return axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers: headers })
      .then((response) => {
        setCartCount((prevCount) => prevCount - 1);
        return response;
      });
  }

  function updateCountItem(id, count) {
    return axios.put(`${baseUrl}/api/v1/cart/${id}`,
      { count: count }, { headers: headers }
    )
  }

  function onlinePayment(id, shippingAddress) {
    return axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}`,
      { shippingAddress: shippingAddress }, { headers: headers }
    )
  }

  return <cartContext.Provider value={{ cartCount, onlinePayment, AddToCart, getLoggedUserCart, removeItem, updateCountItem }}>
    {props.children}
  </cartContext.Provider>
}
