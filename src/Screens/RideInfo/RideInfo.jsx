import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../config/firebase';
import Preloader from '../../components/Preloader/Preloader';
import { useSelector } from 'react-redux';
import EditRideModal from '../../components/EditRideModal/EditRideModal';
import Swal from 'sweetalert2';

function RideInfo() {

    const [rideInfo, setRideInfo] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const { id } = useParams();


    const getRideInfo = useCallback(() => {
        setLoading(true);

        const docRef = doc(db, "rides", id);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setRideInfo({ ...docSnap.data(), id: id });
            } else {
                console.log("No such document!");
                // Optionally handle the case where the document doesn't exist
            }
            setLoading(false);
        });

        return unsubscribe; // Return unsubscribe function to clean up the listener
    }, [id, setRideInfo]);

    useEffect(() => {
        const unsubscribe = getRideInfo();

        return () => unsubscribe(); // Clean up the listener when the component unmounts
    }, [id, getRideInfo]);



    // function to book ride 

    const bookRide = async () => {
        const docref = doc(db, "rides", id);
        await updateDoc(docref, {
            status: "inactive",
            passengerId: user.id
        });
        await Swal.fire({
            position: "center",
            icon: "success",
            title: "Ride Booked Successfully",
            showConfirmButton: false,
            timer: 1000
        });
        navigate("/mybookings");
    }




    if (loading) {
        return <Preloader />
    }



    return (
        <div className="container ride-info-page">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <div className="img-sec">
                        <img src={rideInfo.imageUrl} className='img-fluid w-100' alt="" />
                    </div>
                </div>
                <div className="col-lg-7">
                    <h2 className='fw-bold ms-3 my-3'><span className='fw-medium'>{rideInfo.from + " - " + rideInfo.to}</span></h2>
                    <h5 className='ms-3 my-2 fw-light'>Driver Name : <span className='fw-medium'>{rideInfo.driverName}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Car Name : <span className='fw-medium'>{rideInfo.carName}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Gender : <span className='fw-medium'>{rideInfo.gender}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Number of Seats : <span className='fw-medium'>{rideInfo.numberOfSeats}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Date of journey : <span className='fw-medium'>{rideInfo.date}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Departure Time : <span className='fw-medium'>{rideInfo.time}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Driver Address : <span className='fw-medium'>{rideInfo.driverAddress}</span></h5>
                    <h5 className='ms-3 my-2 fw-light'>Driver Phone No : <span className='fw-medium'>{rideInfo.phoneNo}</span></h5>
                    <h2 className='ms-3 my-3 fw-medium'>Rent : Rs {rideInfo.rent}</h2>

                    {rideInfo.userId === user.id ? (
                        <>
                            <button onClick={() => setModalShow(true)} className='theme-btn'>Edit Info</button>
                            <EditRideModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                ride={rideInfo}
                            />
                        </>
                    ) : (
                        <button onClick={bookRide} className='theme-btn'>Book Now</button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default RideInfo