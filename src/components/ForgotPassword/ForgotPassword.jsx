import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function ForgotPassword() {

  let validationShema = Yup.object({
    email: Yup.string().required('email is required').email('enter avalid email')
  })

  async function sendCode(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    console.log(data)
    if (data.statusMsg == 'success') {
      console.log('success')
      document.querySelector('.forgotpassword').classList.add('d-none')
      document.querySelector('.verfiyCode').classList.remove('d-none')
    }
  }
  let formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationShema
    ,
    onSubmit: sendCode
  })

  let validationShema2 = Yup.object({
    resetCode: Yup.string().required('email is required')
  })
  let navigate = useNavigate()
  async function sendData(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    console.log(data)
    if (data.status == 'Success') {
      navigate('/resetPassword')
    }

  }
  let verfiyFormik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: validationShema2
    ,
    onSubmit: sendData
  })
  return (
    <>
      <div className='forgotpassword'>
        <h3>Forgot Password :</h3>
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>

          <label>Email :</label>
          <input onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} id='email' name='email' className='form-control' />
          {formik.touched.email && formik.errors.email ? <p className='text-danger my-3'>{formik.errors.email}</p> : ''}
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light my-3'>send Code</button>
        </form>
      </div>
      <div className='verfiyCode d-none'>
        <h3>Verify Code :</h3>
        <form onSubmit={verfiyFormik.handleSubmit} className='w-75 mx-auto my-5'>

          <label>Reset Code :</label>
          <input onBlur={verfiyFormik.handleBlur} type='text' value={verfiyFormik.values.resetCode} onChange={verfiyFormik.handleChange} id='resetCode' name='resetCode' className='form-control' />
          {verfiyFormik.touched.resetCode && verfiyFormik.errors.resetCode ? <p className='text-danger my-3'>{verfiyFormik.errors.resetCode}</p> : ''}
          <button disabled={!(verfiyFormik.isValid && verfiyFormik.dirty)} type='submit' className='btn bg-main text-light my-3'>send Code</button>
        </form>
      </div>
    </>

  )
}
