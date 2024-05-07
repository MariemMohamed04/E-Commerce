import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  let navigate = useNavigate()
  async function RestPassword(values) {
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
    console.log(data)
    if (data.token) {
      navigate('/login')
    }
  }
  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    onSubmit: RestPassword
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='w-75 my-5 m-auto'>
        <div className='mb-3'>
          <label>Email :</label>
          <input type='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id='email' value={formik.values.email} />
        </div>
        <div className='mb-3'>
          <label>New Password :</label>
          <input type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id='newPassword' value={formik.values.newPassword} />
        </div>
        <button className='btn bg-main text-light my-3'>Reset Password</button>
      </form>
    </div>
  )
}
