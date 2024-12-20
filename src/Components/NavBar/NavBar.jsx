import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/Token";
import { cartContext } from "../../Context/cartContext";
export default function NavBar() {
  let { token, setToken } = useContext(TokenContext);

  let { totalNumberOfCart } = useContext(cartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/home"}>
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to={"/home"}>
                    Home
                  </Link>
                </li>

  
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/brands"}
                  >
                    Brands
                  </Link>
                </li>
          
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/allOrders"}
                  >
                    AllOrders
                  </Link>
                </li>
                <li className="nav-item position-relative">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"/cart"}
                    >
                      {/* <i className="fa fa-shopping-cart "></i>
                      <span className=" bg-main p-1 rounded position-absolute top-0 end-0" >{totalNumberOfCart}</span> */}
                 
                      <i className="fa fa-shopping-cart "></i>
                    </Link>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    
                        {totalNumberOfCart ? totalNumberOfCart: ""}
                      </span>
                  </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center ">
                <i className="fa-brands mx-1 fa-instagram"></i>
                <i className="fa-brands mx-1 fa-facebook"></i>
                <i className="fa-brands mx-1 fa-twitter"></i>
                <i className="fa-brands mx-1 fa-linkedin"></i>
              </li>

              {token ? (
                <>
               
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"/profile"}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={logOut}
                      className="nav-link "
                      aria-current="page"
                    >
                      LogOut
                    </button>
                  </li>
               
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
