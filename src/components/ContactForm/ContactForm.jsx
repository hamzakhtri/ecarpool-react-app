import React from 'react'
import contactImg from '../../assets/img/contact-img.png'

function ContactForm({title}) {
    return (
        <section className='contact-sec'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2>{title}</h2>
                        <div className="form-sec">
                            <div className="input-field">
                                <input type="text" placeholder='Enter Name' className='form-control' />
                            </div>
                            <div className="input-field">
                                <input type="email" placeholder='Enter Email' className='form-control' />
                            </div>
                            <div className="input-field">
                                <textarea className='form-control w-100' rows="3" placeholder='Your Message'></textarea>
                            </div>
                            <div className="submit-btn">
                                <button className='theme-btn m-0 my-4 w-100'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <img src={contactImg} alt="contact" className='img-fluid' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm