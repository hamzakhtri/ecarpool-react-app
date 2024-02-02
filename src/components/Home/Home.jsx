import React from 'react'
import TopBar from '../TopBar/TopBar'
import Hero from '../Hero/Hero'
import AboutSec from '../AboutSec/AboutSec'
import MapSec from '../MapSec/MapSec'
import Testimonial from '../Testimonials/Testimonial'
import Footer from '../Footer/Footer'
import Contact from '../Contact/Contact'

function Home() {
  return (
    <div>
        <TopBar/>
        <Hero/>
        <AboutSec/>
        <MapSec/>
        <Testimonial/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home