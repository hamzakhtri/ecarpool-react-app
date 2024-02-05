import React from 'react'
import { useSelector } from 'react-redux'

function FindRides() {

    const user = useSelector(state => state.user.currentUser);
    
    return (
        <section className="findrides-page">
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>{user ? user.username : "Hello"}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container contact-page-form">
                <div className="pt-5">
                </div>
            </div>
        </section>
    )
}

export default FindRides