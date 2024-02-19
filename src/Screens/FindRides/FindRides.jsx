import React, { useState } from 'react';
import RideCard from '../../components/RideCard/RideCard';
import { useSelector } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import "./FindRides.css"

function FindRides() {
    const rides = useSelector(state => state.rides.rides);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    if (rides === false) {
        return <Preloader />;
    }

    const filteredRides = rides.filter(ride => {
        const formattedFrom = from.trim().toLowerCase();
        const formattedTo = to.trim().toLowerCase();

        return (
            ride.status === 'active' &&
            ride.isCompleted === false &&
            !ride.passengerId &&
            ride.from.trim().toLowerCase().includes(formattedFrom) &&
            ride.to.trim().toLowerCase().includes(formattedTo)
        );
    });

    const handleFromChange = (event) => {
        setFrom(event.target.value);
    };

    const handleToChange = (event) => {
        setTo(event.target.value);
    };

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
                    <div className="d-flex align-items-center mb-3 ride-search-sec">
                        <div className="mb-3 me-3">
                           <h3 className='m-0'>Filter Rides</h3>
                        </div>
                        <div className="mb-3 me-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="From"
                                value={from}
                                onChange={handleFromChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="To"
                                value={to}
                                onChange={handleToChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {filteredRides.map((ride) => (
                            <div key={ride.id} className="col-lg-4 mb-5">
                                <RideCard ride={ride} editMode={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FindRides;
