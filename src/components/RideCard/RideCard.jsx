import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../config/firebase';
import Swal from 'sweetalert2';
import EditRideModal from '../EditRideModal/EditRideModal';

function RideCard({ ride, editMode }) {

    const [modalShow, setModalShow] = useState(false);


    const deleteRide = async () => {
        const confirmationResult = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });
        if (confirmationResult.isConfirmed) {
            await deleteDoc(doc(db, "rides", ride.id));
        }

    }


    if (editMode) {

        return (
            <div className="card mx-2" >
                <img src={ride.imageUrl} width={250} height={250} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h6 className="card-title">{ride.from + " - " + ride.to}</h6>
                    <p className="p-0 mb-1 small">Car: <b>{ride.carName}</b></p>
                    <p className="p-0 mb-1 small">Driver Name: <b>{ride.driverName}</b></p>
                    <p className="p-0 mb-1 small">Rent: <b>{ride.rent}</b></p>
                    <p className="p-0 mb-1 small">Date and Time: <b>{ride.date + " / " + ride.time} </b></p>
                    <p className="p-0 mb-1 small">Number Of Seats : {ride.numberOfSeats}</p>
                    <p className="p-0 mb-1 small">Status : <b>{ride.status}</b></p>
                    <p className="p-0 mb-3 small">Address : <b>{ride.driverAddress}</b></p>
                    <div className="d-flex justify-content-between">
                        <button onClick={() => setModalShow(true)} className="btn btn-success btn-sm">
                            Edit Info
                        </button>
                        <EditRideModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            ride={ride}
                        />
                        <button onClick={deleteRide} className="btn btn-danger btn-sm">
                            delete
                        </button>
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div className="card mx-2" >
                <img src={ride.imageUrl} width={250} height={250} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{ride.from + " - " + ride.to}</h5>
                    <p className="p-0 mb-1">Car: <b>{ride.carName}</b></p>
                    <p className="p-0 mb-1">Driver Name: <b>{ride.driverName}</b></p>
                    <h5 className="card-title my-3">Number Of Seats : {ride.numberOfSeats}</h5>
                    <div className="d-flex justify-content-between">
                        <Link to={`/rideinfo/${ride.id}`} className="btn btn-dark btn-sm">
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
        )
    }


}

export default RideCard