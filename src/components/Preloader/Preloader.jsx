import React from 'react'
import preloaderImg from "../../assets/img/preloader-img.gif"

function Preloader() {
  return (
    <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
        <img src={preloaderImg} width={150} className='img-fluid' alt="" />
    </div>
  )
}

export default Preloader