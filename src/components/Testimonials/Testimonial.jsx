import React from 'react'
import img1 from "../../assets/img/testi-1.jpg";
import img2 from "../../assets/img/testi-2.jpg";
import img3 from "../../assets/img/testi-3.jpg";

function Testimonial() {
    return (
        <div className="testimonials-clean pt-4">
            <div className="container">
                <div className="intro">
                    <h2>Testimonials </h2>
                </div>
                <div className="row people">
                    <div className="col-md-6 col-lg-4 item">
                        <div className="box">
                            <p className="description">
                                Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus.
                                Praesent aliquam in tellus eu gravida. Aliquam varius finibus est.
                            </p>
                        </div>
                        <div className="author">
                            <img className="rounded-circle" src={img1} alt='user1'/>
                            <h5 className="name">Ben Johnson</h5>
                            <p className="title">CEO of Company Inc.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 item">
                        <div className="box">
                            <p className="description">
                                Praesent aliquam in tellus eu gravida. Aliquam varius finibus est,
                                et interdum justo  eu gravida. Aliquam varius finibus est,
                            </p>
                        </div>
                        <div className="author">
                            <img className="rounded-circle" src={img2} alt='user2'/>
                            <h5 className="name">Carl Kent</h5>
                            <p className="title">Founder of Style Co.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 item">
                        <div className="box">
                            <p className="description">
                                Aliquam varius finibus est, et interdum justo suscipit. Vulputate
                                quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.
                            </p>
                        </div>
                        <div className="author">
                            <img className="rounded-circle" src={img3} alt='user3'/>
                            <h5 className="name">Emily Clark</h5>
                            <p className="title">Owner of Creative Ltd.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Testimonial