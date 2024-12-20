import React from 'react'
import styles from './NotFound.module.css'
import notFoundImg from '../../Assets/images/error.svg'
export default function NotFound() {
  return <>
  
  <div className="container my-5">
    <img src={notFoundImg} className='w-100' alt="" />
  </div>
  </>
}
