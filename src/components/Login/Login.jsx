import React, { useContext, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { userContext } from "../../context/userToken";

export default function Login() {
  let { setToken } = useContext(userContext)
  let navigate = useNavigate()
  const [errMessage, setErr] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const schemaValidation = Yup.object({
    email: Yup.string().required('email is required').email('enter avalid email'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,}$/i, 'enter avalid password'),
  })

  async function signIn(values) {
    setLoading(true)
    // console.log(values)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
      setErr(err.response.data.message)
      setLoading(false)
    })
    console.log(data)

    if (data.message == 'success') {
      setErr(null)
      setLoading(false)
      formik.resetForm()
      navigate('/')
      localStorage.setItem('userToken', data.token)
      setToken(localStorage.getItem('userToken'))
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemaValidation,
    onSubmit: signIn
  })

  return (
  <>
            <Helmet>
        <title>Login</title>
      </Helmet>
    <div className="w-75 mx-auto my-5">
      <h2 className="text-main fw-bold mb-3">Login Form</h2>
      {
        errMessage !== null ?
          <p className="alert alert-danger">{errMessage}</p>
          :
          ''
      }
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className="form-control" />
          {formik.errors.email && formik.touched.email ?
            <div className="alert alert-danger">{formik.errors.email}</div> :
            null
          }
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id="password" className="form-control" />
          {formik.errors.password && formik.touched.password ?
            <div className="alert alert-danger">{formik.errors.password}</div> :
            null
          }
        </div>
        {isLoading ?
          <button className="btn bg-main text-light d-block ms-auto"><i className="fa-solid fa-spinner fa-spin"></i></button>
          :
          <>
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-light float-end">
              Login
            </button>
            <Link to='/register'>
              <span className="text-main">Register Now...</span>
            </Link>
            <br />
            <Link to='/forgotPassword'>
              <span className="text-main">Forgot Password</span>
            </Link>
          </>
        }
      </form>
    </div>
  </>
  );
}
