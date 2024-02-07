import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase';
import Preloader from '../../components/Preloader/Preloader';

function RideInfo() {

    const [rideInfo, setRideInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();


    const getRideInfo = useCallback(async () => {

        setLoading(true);

        const docRef = doc(db, "rides", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setRideInfo(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

        setLoading(false);

    }, [id])

    useEffect(() => {

        getRideInfo();

    }, [id, setRideInfo, getRideInfo])

    if(loading){
        return <Preloader/>
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
                    <h2 className='fw-bold ms-3'><span className='fw-medium'>{rideInfo.from + " - " + rideInfo.to}</span></h2>
                    <h5 className='ms-3 my-3 fw-light'>Driver Name : <span className='fw-medium'>{rideInfo.driverName}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Gender : <span className='fw-medium'>{rideInfo.gender}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Number of Seats : <span className='fw-medium'>{rideInfo.numberOfSeats}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Date of journey : <span className='fw-medium'>{rideInfo.date}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Departure Time : <span className='fw-medium'>{rideInfo.time}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Driver Address : <span className='fw-medium'>{rideInfo.driverAddress}</span></h5>
                    <h5 className='ms-3 my-3 fw-light'>Driver Phone No : <span className='fw-medium'>{rideInfo.phoneNo}</span></h5>
                    <h2 className='ms-3 my-3 fw-medium'>Rent : Rs {rideInfo.rent}</h2>

                </div>
            </div>
        </div>
    )
}

export default RideInfo