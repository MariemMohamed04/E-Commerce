import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Carts from './components/Carts/Carts'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Category from './components/Category/Category'
import Brands from './components/Brands/Brands';
import Wishlist from './components/Wishlist/Wishlist';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/allorders/allorders';
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import { userContext } from "./context/userToken";
import CounterContextProvider from './context/counterContext';
import { Toaster } from "react-hot-toast";


export default function App() {

  let { setToken } = useContext(userContext)

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: 'resetPassword', element: <ResetPassword /> },

        { path: 'products', element: <ProtectedRouter><Products /></ProtectedRouter> },
        { path: 'brands', element: <ProtectedRouter><Brands /></ProtectedRouter> },
        { path: 'wishlist', element: <ProtectedRouter><Wishlist /></ProtectedRouter> },
        { path: 'category', element: <ProtectedRouter><Category /></ProtectedRouter> },
        { path: 'details/:id', element: <ProtectedRouter><Details /></ProtectedRouter> },
        { path: 'carts', element: <ProtectedRouter><Carts /></ProtectedRouter> },
        { path: 'checkout', element: <ProtectedRouter><Checkout /></ProtectedRouter> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setToken(localStorage.getItem('userToken'))
    }
  }, [])

  return (
    <>
        <RouterProvider router={router} />
      <Toaster/>
    </>
  )
}

