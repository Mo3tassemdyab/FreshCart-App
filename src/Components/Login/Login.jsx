import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";



export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setToken, getUserData } = useContext(TokenContext);
  async function callLogin(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });

    console.log(data);
    if (data.message === "success") {
      // login
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      getUserData(data.token)
      navigate("/home");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("email ot Valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password required"),
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger"> {errorMessage} </div>
        ) : null}
        <form onSubmit={loginFormik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-1">
              Email :
            </label>
            <input
              type="email"
              id="email"
              value={loginFormik.values.email}
              name="email"
              className="form-control "
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
          </div>

          {loginFormik.errors.email && loginFormik.touched.email ? (
            <div className="alert alert-danger">
              {loginFormik.errors.email}{" "}
            </div>
          ) : null}

          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password :
            </label>
            <input
              type="password"
              id="password"
              value={loginFormik.values.password}
              name="password"
              className="form-control "
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
          </div>

          {loginFormik.errors.password && loginFormik.touched.password ? (
            <div className="alert alert-danger">
              {loginFormik.errors.password}{" "}
            </div>
          ) : null}

          <button
            className="btn bg-main text-white  w-100"
            disabled={!(loginFormik.isValid && loginFormik.dirty)}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>

          <div className=" text-center my-3 ">
      
               <Link className="text-primary" to={'/forgetPassword'}>FogetPassword.....?</Link>
     
     </div>
        </form>
      </div>
    </>
  );
}
