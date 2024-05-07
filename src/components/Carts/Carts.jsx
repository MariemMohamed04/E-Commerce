import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/cartContext';
import Products from '../Products/Products';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Carts() {
  const [details, setDetails] = useState("");
  const [cartDetais, setCart] = useState([]);
  let { getLoggedUserCart, removeItem, updateCountItem } = useContext(cartContext);

  async function getCartItem() {
    let { data } = await getLoggedUserCart();
    console.log(data.data);
    setDetails(data?.data);
    setCart(data?.data.products);
  }

  async function deleteItem(id) {
    let { data } = await removeItem(id);
    console.log(data.data.products)
    setCart(data.data.products)
  }

  async function updateCartItem(id, count) {
    let { data } = await updateCountItem(id, count)
    // console.log(data)
    setCart(data.data.products)
  }
  
  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <div className='content'>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="bg-main-light my-5 p-5">
        <div>
          <h2>Shop Cart</h2>
          <h5 className="text-main">Total Price : {details.totalCartPrice}$</h5>
        </div>
        <div className="text-end my-2">
          <button className="btn btn-outline-danger">Empty Cart</button>
        </div>
        {cartDetais.map((product) => {
          return (
            <>
              {product.count !== 0 ?
                <div className="row my-3 border-bottom py-3" key={product._id}>
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
                      <p>Price : {product.price} EGP</p>
                      <button
                        onClick={() => { deleteItem(product.product._id) }}
                        className="btn btn-outline-danger">
                        <i className="fa-regular fa-trash-can mx-2"></i>Remove
                      </button>
                    </div>
                    <div>
                      <button onClick={() => { updateCartItem(product.product._id, product.count + 1) }} className="btn btn-outline-success">+</button>
                      <span className="mx-2">{product.count}</span>
                      <button onClick={() => { updateCartItem(product.product._id, product.count - 1) }} className="btn btn-outline-success">-</button>
                    </div>
                  </div>
                </div> :
                ''
              }
            </>
          );
        })}
        <Link to='/checkout'>
          <button className="btn bg-main text-light my-3">Online Payment</button>
        </Link>
      </div>
    </div>
  )
}
