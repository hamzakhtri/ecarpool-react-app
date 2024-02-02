import React from 'react'
import Hero from '../../components/Hero/Hero'
import AboutSec from '../../components/AboutSec/AboutSec'
import MapSec from '../../components/MapSec/MapSec'
import Testimonial from '../../components/Testimonials/Testimonial'
import ContactForm from '../../components/ContactForm/ContactForm'

function Home() {
  return (
    <div>
        <Hero/>
        <AboutSec/>
        <MapSec/>
        <Testimonial/>
        <ContactForm title="Contact Us"/>
    </div>
  )
}

export default Home