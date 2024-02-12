import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BookingCard from '../../components/BookingCard/BookingCard';

function MyBookings() {

    const [bookedRides, setBookedRides] = useState("");
    const [bookedPassenger, setBookedPassenger] = useState("");


    const rides = useSelector(state => state.rides.rides);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        const myRides = [];
        rides.forEach((ride) => {
            ride.passengerId === user.id && ride.isCompleted === false && ride.status === "inactive" && myRides.push(ride);
        });

        setBookedRides(myRides);

        const myPassengers = [];
        rides.forEach((ride) => {
            ride.userId === user.id && ride.isCompleted === false && ride.status === "inactive" && myPassengers.push(ride) ;
        });

        setBookedPassenger(myPassengers);

    }, [rides, user.id])




    

    return (
        <>
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>My Bookings</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5 my-5">
                <div className='mb-5'>
                    <h2>Bookings As a Passanger</h2>
                    <div className="drivers-box p-4 border border-2 border-dark">
                        
                        {bookedRides.length > 0 ?
                            bookedRides.map((ride) => {
                                return (
                                    <div key={ride.id}>
                                        <BookingCard bookedRide={ride} rideFor="passenger"/>
                                    </div>
                                )
                            })
                            : <h3 className='text-center my-4'>No Rides Please Find Rides</h3>}
                    </div>
                </div>
                <div>
                    <h2>Bookings As a Driver</h2>
                    <div className="drivers-box p-4 border border-2 border-dark">
                        
                        {bookedPassenger.length > 0 ?
                            bookedPassenger.map((ride) => {
                                return (
                                    <div key={ride.id}>
                                        <BookingCard bookedRide={ride} rideFor="driver"/>
                                    </div>
                                )
                            })
                            : <h3 className='text-center my-4'>No Rides Please share Rides</h3>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyBookings