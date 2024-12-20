import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";


export let TokenContext =  createContext();

export default function TokenContextProvider(props){


    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

        function getUserData(){
          const userData =  jwtDecode(localStorage.getItem('userToken'));
          console.log(userData);
          setUserData(userData)
          
        }


    return <TokenContext.Provider value={{token,setToken,userData,setUserData,getUserData}}>
            {props.children}
    </TokenContext.Provider>
}