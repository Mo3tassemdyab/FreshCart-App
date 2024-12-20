import React, { useState } from 'react'
import styles from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {


let [errorMessage, setErrorMessage] = useState("");
 let nav = useNavigate()
let [formStatus, setFormStatus] = useState(true)

let validationSchema = Yup.object({
  email: Yup.string().email("email ot Valid").required("email is required"),

});
let validationSchema2 = Yup.object({
  resetCode: Yup.string().required(" resetCode is required").matches(/^[0-9]{5,6}$/,"enter valid code"),

});


  let formik = useFormik({
    initialValues:{
      email:""
    },
    onSubmit: forgetPasswordApi,
    validationSchema
  })

  let formik2 = useFormik({
    initialValues:{
      resetCode:""
    },
    onSubmit:verifyResetCode ,
    validationSchema2
  })




  async function forgetPasswordApi(value){
    console.log(value);
    
    let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value).catch((err)=>{
      console.log(err.response.data.message)
      
      setErrorMessage(err.response.data.message)
    })
    if (req.data.statusMsg == 'success') {
        setFormStatus(false)
    }
    console.log(req);
 
  }


  async function verifyResetCode(value){
    let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch( (err)=>{
      setErrorMessage(err.response.data.message)
    } )
    console.log(req);
    if (req.data.status == "Success") {
      nav('/resetPassword')
    }
    
  }
  return <>

 <div>
 {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ""}
 </div>

  
    <div className="container  my-5">
    <div className="w-75 mx-auto bg-main-light  p-5">

      

      {formStatus ?   <form onSubmit={formik.handleSubmit} >
        <label htmlFor="email" className="mb-1">
                Email :
              </label>
              <input
                type="email"
                id="email"
                value={formik.values.email}
                name="email"
                className="form-control "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button type='submit' className='btn bg-main text-white'>Send</button>
        </form>
   :         <form onSubmit={formik2.handleSubmit} >
   <label htmlFor="resetCode" className="mb-1">
           Enter rest Code
         </label>
         <input
           type="string"
           id="resetCode"
           value={formik2.values.resetCode}
           name="resetCode"
           className="form-control "
           onBlur={formik2.handleBlur}
           onChange={formik2.handleChange}
         />
         {formik2.errors.resetCode && formik2.touched.resetCode ? <div className='alert alert-danger'>{formik2.errors.resetCode}</div>  : ""}
         <button type='submit' className='btn bg-main text-white'>Confirm Code</button>
   </form>}
      
 



      </div>
    </div>
  </>
}
