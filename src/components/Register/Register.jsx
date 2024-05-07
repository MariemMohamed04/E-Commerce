import React, { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Register() {

  let navigate = useNavigate()
  const [errMessage, setErr] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const schemaValidation = Yup.object({
    name: Yup.string().min(3, 'Min Length is 3 Characters').max(15, 'Max Length is 15 Characters').required('Name is required'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/i, 'Enter a valid phone number'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{4,}$/i, 'Enter a valid password'),
    rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], 'Not Matching'),
  })

  async function signUp(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => {
      setErr(err.response.data.message)
      setLoading(false)
    })

    if (data.message == 'success') {
      setErr(null)
      setLoading(false)
      formik.resetForm()
      navigate('/login')
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: schemaValidation,
    onSubmit: signUp
  })

  return (
    <>
              <Helmet>
        <title>Register</title>
      </Helmet>
    <div className="w-75 mx-auto my-5">
      <h2 className="text-main fw-bold mb-3">Register Form</h2>
      {
        errMessage !== null ?
          <p className="alert alert-danger">{errMessage}</p>
          :
          ''
      }
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" id="name" className="form-control" />
          {formik.errors.name && formik.touched.name ?
            <div className="alert alert-danger">{formik.errors.name}</div> :
            null
          }
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className="form-control" />
          {formik.errors.email && formik.touched.email ?
            <div className="alert alert-danger">{formik.errors.email}</div> :
            null
          }
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" id="phone" className="form-control" />
          {formik.errors.phone && formik.touched.phone ?
            <div className="alert alert-danger">{formik.errors.phone}</div> :
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
        <div className="mb-3">
          <label htmlFor="rePassword">RePassword</label>
          <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" id="rePassword" className="form-control" />
          {formik.errors.rePassword && formik.touched.rePassword ?
            <div className="alert alert-danger">{formik.errors.rePassword}</div> :
            null
          }
        </div>
        {isLoading ?
          <button className="btn bg-main text-light d-block ms-auto"><i className="fa-solid fa-spinner fa-spin"></i></button>
          :
          <>
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-light float-end">
              Register
            </button>
            <Link to='/login'>
              <span className="text-main">Login Now...</span>
            </Link>
          </>
        }
      </form>
    </div>
    </>
  );
}