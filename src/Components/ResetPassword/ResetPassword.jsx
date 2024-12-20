import React from "react";
import styles from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {

 let navg = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email("email ot Valid").required("email is required"),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/)
      .required("newPassword required"),
  });

  let form = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: ResetPasswordApi,
    validationSchema,
  });

  async function ResetPasswordApi(value){
      let req = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value);
      if (req.data.token) {
        navg('/login')
      }
      console.log(req);
      
  }

  return (
    <>

    <div className="container">
      <h2>Reset Password</h2>
      <div className="">
      <form onSubmit={form.handleSubmit}>
        <label htmlFor="email" className="mb-1">
          Email :
        </label>
        <input
          type="email"
          id="email"
          value={form.values.email}
          name="email"
          className="form-control "
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        <label htmlFor="newPassword">newPassword :</label>
        <input
          className="form-control "
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          type="password"
          name="newPassword"
          id="newPassword"
        />

        <button className="btn bg-main text-white mt-3 d-block ms-auto">Update Password</button>
      </form>
    
         
        </div>

    </div>
     
    </>
  );
}
