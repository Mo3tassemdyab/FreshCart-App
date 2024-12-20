import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';

import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';

import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/Token';
import ProtectedRoutes from './Components/Protectedoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Profile from './Components/Profile/Profile';
import { jwtDecode } from 'jwt-decode';

function App() {

  let {setToken,getUserData,setUserData} = useContext(TokenContext)

const routes =   createBrowserRouter([
    {path:"", element:<LayOut/> , children:[
  
      {path:"", element: <ProtectedRoutes> <Home/></ProtectedRoutes> },
      {path:"home", element: <ProtectedRoutes> <Home/></ProtectedRoutes> },
      {path:'products', element:  <ProtectedRoutes><Products/></ProtectedRoutes>   },
      {path:'categories', element: <ProtectedRoutes> <Categories/></ProtectedRoutes>   },
      {path:'brands', element:<ProtectedRoutes> <Brands/></ProtectedRoutes> },
      {path:'cart', element: <ProtectedRoutes> <Cart/></ProtectedRoutes> },
      {path:'details/:id', element: <ProtectedRoutes> <ProductDetails/></ProtectedRoutes> },
      {path:'checkout', element: <ProtectedRoutes> <CheckOut/></ProtectedRoutes> },
      {path:'allOrders', element: <ProtectedRoutes> <AllOrders/></ProtectedRoutes> },
      {path:'profile', element: <ProtectedRoutes> <Profile/></ProtectedRoutes> },
      {path:'register', element:<Register/>},
      {path:'login', element:<Login/>},
      {path:'forgetPassword', element:<ForgetPassword/>},
      {path:'resetPassword', element:<ResetPassword/>},

  
    
  
      



      {path:'*', element:<NotFound/>},

    ]}
  ]);


  useEffect( ()=> {
    if (localStorage.getItem('userToken') != null) {
      setToken(localStorage.getItem('userToken'))
      // setUserData(jwtDecode(localStorage.getItem('userToken')));
      getUserData();
 
    }
  }, [] )

  return <>
       <RouterProvider router={routes}> 
     </RouterProvider>
 
  </>


}

export default App;
