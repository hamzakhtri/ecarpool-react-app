import React from 'react'
import AboutSec from '../../components/AboutSec/AboutSec'
import aboutImage from "../../assets/img/about-jpg.jpg"

function About() {
    return (
        <section className='about-page'>
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>About Us</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="about-content">
                <div className="container">
                    <div className="row g-lg-5 align-items-center">
                        <div className="col-lg-6">
                            <img src={aboutImage} className='img-fluid w-100' alt="cab" />
                        </div>
                        <div className="col-lg-6 pe-5">
                            <h2 className='h1 mb-4'>Who Are We?</h2>
                            <p >
                                Welcome to E-Carpool, your go-to ride-sharing web application for a seamless and efficient commuting experience! Whether you're looking to share your daily commute with fellow travelers or in need of a ride, our platform connects users with ease. With E-Carpool, finding and offering rides becomes a breeze, promoting a more sustainable and cost-effective way to travel. Say goodbye to the hassle of navigating public transportation or dealing with the stress of driving solo. Join our community of like-minded individuals, share the journey.</p>
                                <button className='theme-btn m-0 my-3'>Contact Us</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <AboutSec/>
            </div>

        </section>
    )
}

export default About