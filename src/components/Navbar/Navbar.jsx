import React, { useContext } from 'react';
import img from './../../assets/img/shopping-bag-cart-svgrepo-com.svg';
import { Link, useNavigate } from 'react-router-dom';
import { CounterContext, counterContext } from '../../context/counterContext'
import { userContext } from '../../context/userToken'
import { cartContext } from '../../context/cartContext';

export default function Navbar() {
  let navigate = useNavigate()
  let { userToken, setToken } = useContext(userContext)
  let {cartCount, AddToCart} = useContext(cartContext)

  function logOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={img} alt='' />
            <span className='fw-bolder'>Online Store</span>
          </Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userToken !== null ?
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="category">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">Brands</Link>
                </li>
              </ul> :
              ''
            }
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 position-relative">
              {
                userToken !== null ?                
                <li className="nav-item d-flex align-items-center">
                  <Link className="nav-link" to="carts"><i class="fa-solid fa-cart-shopping mx-1 fs-4 cursor-pointer"></i></Link>
                <div className="badge position-absolute text-white top-0 start-0 bg-main">{cartCount}</div>
                <Link className="nav-link" to="wishlist"><i class="fa-solid fa-heart-circle-plus mx-1 fs-4 cursor-pointer"></i></Link>
              </li> :
              ''
              }
              {
                userToken == null ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="register">Register</Link>
                    </li>
                  </> :
                  <li className="nav-item">
                    <Link onClick={() => { logOut() }} className="nav-link" to='login'><i class="fa-solid fa-right-from-bracket fs-4"></i></Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
