import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function callRegister(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });

    console.log(data);
    if (data.message === "success") {
      // login
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("Name is required"),
    email: Yup.string().email("email ot Valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword should match")
      .required("rePassword required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone required"),
  });

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register Page</title>
      </Helmet>

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger"> {errorMessage} </div>
        ) : null}
        <form onSubmit={registerFormik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-1">
              Full Name :
            </label>
            <input
              type="text"
              id="fullName"
              value={registerFormik.values.name}
              name="name"
              className="form-control "
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
          </div>

          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div className="alert alert-danger">
              {registerFormik.errors.name}{" "}
            </div>
          ) : null}

          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-1">
              Email :
            </label>
            <input
              type="email"
              id="email"
              value={registerFormik.values.email}
              name="email"
              className="form-control "
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
          </div>

          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div className="alert alert-danger">
              {registerFormik.errors.email}{" "}
            </div>
          ) : null}

          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password :
            </label>
            <input
              type="password"
              id="password"
              value={registerFormik.values.password}
              name="password"
              className="form-control "
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
          </div>

          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div className="alert alert-danger">
              {registerFormik.errors.password}{" "}
            </div>
          ) : null}

          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-1">
              rePassword :
            </label>
            <input
              type="password"
              id="rePassword"
              value={registerFormik.values.rePassword}
              name="rePassword"
              className="form-control "
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
          </div>
          {registerFormik.errors.rePassword &&
          registerFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {registerFormik.errors.rePassword}{" "}
            </div>
          ) : null}

          <div className="form-group mb-2">
            <label htmlFor="phone" className="mb-1">
              Phone :
            </label>
            <input
              type="tel"
              id="phone"
              value={registerFormik.values.phone}
              name="phone"
              className="form-control "
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
          </div>
          {registerFormik.errors.phone && registerFormik.touched.phone ? (
            <div className="alert alert-danger">
              {registerFormik.errors.phone}{" "}
            </div>
          ) : null}

          <button
            className="btn bg-main text-white d-block ms-auto"
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
