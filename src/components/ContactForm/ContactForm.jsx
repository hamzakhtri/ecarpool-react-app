import React, { useState } from 'react'
import contactImg from '../../assets/img/contact-img.png'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Swal from 'sweetalert2';


function ContactForm({ title }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const submitForm = async () => {
        setLoading(true);
        if (name && email && message) {

            await addDoc(collection(db, "contactforms"), {
                name, email, message
            });
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Message Sent",
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
            setName("");
            setEmail("");
            setMessage("");

        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "All Fields Required",
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
        }

    }

    return (
        <section className='contact-sec'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2>{title}</h2>
                        <div className="form-sec">
                            <div className="input-field">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='form-control' />
                            </div>
                            <div className="input-field">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='form-control' />
                            </div>
                            <div className="input-field">
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='form-control w-100' rows="3" placeholder='Your Message'></textarea>
                            </div>
                            <div className="submit-btn">
                                <button onClick={submitForm} className='theme-btn m-0 my-4 w-100'>{loading ? "Submitting" : "Submit"}</button>
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