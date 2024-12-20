import React, { useContext } from 'react'
import { TokenContext } from '../../Context/Token'

export default function Profile() {


const {userData} = useContext(TokenContext)  
  return <>
  
    <div className="container">
        <div className="row   ">
          <div className="profile w-auto p-5 shadow-sm rounded-1  bg-main-light my-5 ">
              <div className="content ">
              <h1> Welcome <span className='text-main'> {userData?.name}</span></h1>
              <h2>Role: <span className='text-main'>{userData?.role}</span></h2>
              </div>
          </div>
        </div>
    </div>
  </>
}
