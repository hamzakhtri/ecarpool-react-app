import React from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'

function Contact() {
    return (
        <section className="contact-page">
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>Contact Us</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container contact-page-form">
                <div className="pt-5">
                    <ContactForm title="Reach Now."/>
                </div>
            </div>
        </section>
    )
}

export default Contact