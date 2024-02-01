

function Hero() {


    return (
        <>

            <section className="hero-section">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <h1 className="text-white">E-Carpool</h1>
                            <p className="text-white">Unlock the future of commuting with our E-Carpool platform. Share rides, book seamlessly, and explore together. Join us in shaping a connected and sustainable way to travel. Your journey starts here.</p>
                            <div className="hero-btns">
                                <button className="theme-btn">Register</button>
                                <button className="theme-btn">Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hero-info text-center">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-4">
                            <div className="card w-100 h-100 p-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <div className="card-icon">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                    </div>
                                    <h5 className="card-title">Find Your Ride</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card w-100 h-100 p-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <div className="card-icon">
                                            <i class="fa-solid fa-handshake"></i>
                                        </div>
                                    </div>
                                    <h5 className="card-title">Select & Book</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card w-100 h-100 p-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <div className="card-icon">
                                            <i class="fa-solid fa-car"></i>
                                        </div>
                                    </div>
                                    <h5 className="card-title">Travel Togather</h5>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Hero;