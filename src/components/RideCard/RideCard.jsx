import React from 'react'
import { Link } from 'react-router-dom'

function RideCard({ ride }) {
    return (
        <div className="card" >
            <img src={ride.imageUrl} width={250} height={250} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ride.from + " - " + ride.to}</h5>
                <p className="p-0 mb-1">Car: <b>{ride.carName}</b></p>
                <p className="p-0 mb-1">Driver Name: <b>{ride.driverName}</b></p>
                <h5 className="card-title my-3">Number Of Seats : {ride.numberOfSeats}</h5>
                <Link to={`/rideinfo/${ride.id}`} className="btn btn-dark">
                    More Info
                </Link>
            </div>
        </div>
    )
}

export default RideCard