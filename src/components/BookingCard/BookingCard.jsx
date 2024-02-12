import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import RatingModal from '../RatingModal/RatingModal';

function BookingCard({ bookedRide }) {

    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);


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





    return (
        <div className="container booking-card">
            <div className="row align-items-center">
                <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.from + " - " + bookedRide.to}</h6></div>
                <div className="col-lg-2 col-sm-4"><h6 className='m-0'>Driver: {bookedRide.driverName}</h6></div>
                <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.date + "/" + bookedRide.time}</h6></div>
                <div className="col-lg-1 col-sm-4"><button className='btn btn-sm btn-dark'>Message</button></div>
                <div className="col-lg-1 col-sm-4"><button onClick={cancelRide} className='btn btn-sm btn-dark'>Cancel</button></div>
                <div className="col-lg-2 col-sm-4"><button onClick={handleShow} className='btn btn-sm btn-dark'>Complete Ride</button></div>
                <RatingModal show={show} setShow = {setShow} id={bookedRide.id}/>
            </div>
        </div>
    )
}

export default BookingCard