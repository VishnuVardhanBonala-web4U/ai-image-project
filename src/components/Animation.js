import React, { useEffect } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css"
const Animation = () =>{
  
  useEffect( () =>
  {
  AOS.init({duration:1000})
  },[])
  
  return (
    <>
      <h1>Animation in React js   </h1>
      <div className="animation" data-aos="fade-up"></div>
      <div className="animation" data-aos="fade-down"></div>
      <div className="animation" data-aos="flip-right"></div>
      <div className="animation" data-aos="zoom-in"></div>
 </>
  )
}

export default Animation