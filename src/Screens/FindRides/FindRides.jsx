import React, {} from 'react'
import RideCard from '../../components/RideCard/RideCard'

import { useSelector } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';

function FindRides() {



    const rides = useSelector(state => state.rides.rides);

    if(rides === false){
        return <Preloader/>
    }


    return (
        <section className="findrides-page">
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>Find Your Rides</h1>
                        </div>
                    </div>
                </div>
            </div>
           <div className="container contact-page-form">
                <div className="pt-5 pb-5">
                    <div className="row g-5">
                        {rides.map((ride) => {
                            return (
                                <div key={ride.id} className="col-lg-4">
                                    <RideCard ride={ride}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> :
            
        </section>
    )
}

export default FindRides