import React from 'react'
import carImg from "../../assets/img/car-img.png"

function AboutSec() {
    return (
        <section className='about-sec'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="pb-5">
                            <h2>About E-Carpool</h2>
                            <div className="d-flex  abt-txt">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <div className="abt-icon">
                                            <i className="fa-solid fa-users"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="h4 fw-bold">Millions Of Journey</h5>
                                    <p className="p-0 m-0 pe-5 me-5">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex  abt-txt">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <div className="abt-icon">
                                            <i className="fa-solid fa-expand"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="h4 fw-bold">Largest Car Rider Service</h5>
                                    <p className="p-0 m-0 pe-5 me-5">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex  abt-txt">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <div className="abt-icon">
                                            <i className="fa-solid fa-taxi"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="h4 fw-bold">Simple & Smart Riding</h5>
                                    <p className="p-0 m-0 pe-5 me-5">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="img-sec text-center">
                            <img src={carImg} className='img-fluid' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSec