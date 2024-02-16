import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2';
import RideCard from '../../components/RideCard/RideCard';
import { addUserAds } from '../../store/features/user/userSlice';
import { convertTimeTo12HourFormat } from '../../hooks/timeConversion';

// global function to convert 24 hour time format to 12 hour 




function ShareRides() {

    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [carName, setCarName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [rent, setRent] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState("");
    const [carImage, setCarImage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:00");
    const [status, setStatus] = useState("active");
    const [driverAddress, setDriverAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // prevent user to select today date or select future date only 

    const today = new Date().toISOString().split('T')[0];


    // if the url contain an idea it mean we have to update document which have same id of params 


    // Function to handle ride creation
    const createRide = async () => {


        // checking if any fields empty or not 
        if (carImage && carName && from && to && rent && numberOfSeats && date && driverAddress) {


            try {

                setLoading(true);
                // upload image to firebase storage and getting download 
                // url and setting it into firesotre rides collection 
                const storageRef = ref(storage, `images/${Date.now()}.jpg`);
                const snapshot = await uploadBytes(storageRef, carImage);
                const url = await getDownloadURL(snapshot.ref);

                // Add ride document to Firestore
                await addDoc(collection(db, "rides"), {
                    userId: user.id,
                    driverName: user.username,
                    carName,
                    from,
                    to,
                    rent,
                    numberOfSeats,
                    date,
                    imageUrl: url,
                    gender: user.gender,
                    time: convertTimeTo12HourFormat(time),
                    status,
                    driverAddress,
                    phoneNo: user.phoneNo,
                    passengerId: null,
                    isCompleted: false,
                    rating: null,
                    userReview: null,
                    documentId : null,
                });

                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Ride Created",
                    showConfirmButton: false,
                    timer: 1500
                });
                // making all field empty 

                setCarImage("");
                fileInputRef.current.value = "";
                setCarName("");
                setFrom("");
                setTo("");
                setRent("");
                setNumberOfSeats("");
                setDate("");
                setTime("10:00");
                setDriverAddress("");
                setStatus("active");



            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }


        } else {
            console.error('Car image is not selected');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All Fields Required",
            });
        }


        setLoading(false);

    }


    // getting all current user ads 


    useEffect(() => {

        const q = query(collection(db, "rides"), where("userId", "==", user.id), where("isCompleted", "==", false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const rides = [];
            querySnapshot.forEach((doc) => {
                rides.push({ ...doc.data(), id: doc.id });
            });
            dispatch(addUserAds(rides));
            console.log(rides);
        });

        return () => unsubscribe();


    }, [dispatch, user.id, user])


    const userAds = useSelector(state => state.user.userAds);




    return (
        <div className='share-rides-page'>
            <div className="inner-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='text-white'>Share Your Rides</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container pb-5 mt-5'>
                <div className="row mb-4 mt-4">
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder='Enter Car Name'
                                className='form-control'
                                value={carName}
                                onChange={(e) => setCarName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder='From'
                                className='form-control'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input type="text"
                                placeholder='To'
                                className='form-control'
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-4">
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="number"
                                placeholder='Rent'
                                className='form-control'
                                value={rent}
                                onChange={(e) => setRent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="date"
                                placeholder='Car Image'
                                className='form-control'
                                value={date}
                                min={today}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="time"
                                className='form-control'
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-4">
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input
                                type="number"
                                placeholder='Number Of Seats'
                                className='form-control'
                                value={numberOfSeats}
                                onChange={(e) => setNumberOfSeats(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <select
                                className='form-control border border-dark shadow-none'
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-field">
                            <input type="text"
                                placeholder='Driver Address'
                                className='form-control'
                                value={driverAddress}
                                onChange={(e) => setDriverAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-field w-100">
                    <input ref={fileInputRef} type="file" className='form-control' onChange={(e) => setCarImage(e.target.files[0])} name="uploadfile" id="img" />
                    <label className='d-block h4 mt-4'>Upload Car Image</label>
                </div>
                <div className='text-center'>
                    <button onClick={createRide} className='theme-btn m-0 mt-4' style={{ width: "180px" }}>{loading ? "Loading..." : "Create Ride"}</button>
                </div>


                <div className="my-ads pt-5 my-5">
                    <h2 className='my-3'>My Ads</h2>
                    <div className="row">

                        {userAds.length < 1 && <div className='col-lg-12'><h2 className='text-secondary text-center my-4'>Empty Rides</h2></div>}
                        {userAds.map((ride) => {
                            return (
                                <div key={ride.id} className="col-lg-4 mb-5">
                                    {ride.isCompleted === false &&  <RideCard ride={ride} editMode={true} />}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareRides;
