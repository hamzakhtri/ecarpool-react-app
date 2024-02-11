import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';

function BookingCard({ bookedRide }) {


    const cancelRide = async () => {
        const confirmationResult = await Swal.fire({
            title: 'Are you sure?',
            text: "Do Your Want To Cancel Ride",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel',
            cancelButtonText: 'No, keep it'
        });
        if (confirmationResult.isConfirmed) {

            await updateDoc(doc(db, "rides", bookedRide.id), {
                passengerId: '',
                status: "active"
            });
        }
    }

    const completeRide = ()=>{

    }

    return (
        <div className="container booking-card">
            <div className="row align-items-center">
                <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.from + " - " + bookedRide.to}</h6></div>
                <div className="col-lg-2 col-sm-4"><h6 className='m-0'>Driver: {bookedRide.driverName}</h6></div>
                <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.date + "/" + bookedRide.time}</h6></div>
                <div className="col-lg-1 col-sm-4"><button className='btn btn-sm btn-dark'>Message</button></div>
                <div className="col-lg-1 col-sm-4"><button onClick={cancelRide} className='btn btn-sm btn-dark'>Cancel</button></div>
                <div className="col-lg-2 col-sm-4"><button onClick={completeRide} className='btn btn-sm btn-dark'>Complete Ride</button></div>
            </div>
        </div>
    )
}

export default BookingCard