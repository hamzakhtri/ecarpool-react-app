import { collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import RatingModal from '../RatingModal/RatingModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentChatRoomId, setFrontUser } from '../../store/features/chatroom/chatRoomSlice';


function BookingCard({ bookedRide, rideFor }) {


    const [show, setShow] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();


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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Ride Canceled",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }


    // getting realtime passengerInfo to show detail of passenger to the driver

    const getPassenger = useCallback(() => {
        setLoading(true);

        const docRef = doc(db, "users", bookedRide.passengerId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setPassengerInfo(docSnap.data());
            } else {
                console.log("No such document!");
                // Optionally handle the case where the document doesn't exist
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Return unsubscribe function to clean up the listener
    }, [setPassengerInfo, bookedRide.passengerId]);

    useEffect(() => {
        const unsubscribe = getPassenger();

        return () => unsubscribe(); // Clean up the listener when the component unmounts
    }, [getPassenger, bookedRide.passengerId]);


    // when user Click on message button it will create chat room of the user if the chatrrom is not available

    const createChatroom = async () => {

        // first getting all chatrooms and check if the both user avaible or not in chatroom 
        // if they are not availbe so we will create chatroom for both


        const querySnapshot = await getDocs(collection(db, "chatrooms"));
        let isChatroomAvailble = false;
        querySnapshot.forEach((doc) => {
            let chatroom = doc.data();
            if (Object.keys(chatroom).includes(user.id) && Object.keys(chatroom).includes(rideFor === "driver" ? bookedRide.passengerId : bookedRide.userId)) {
                isChatroomAvailble = true;
            }
        });
        if (!isChatroomAvailble) {
            if (rideFor === "driver") {
                await setDoc(doc(db, "chatrooms", bookedRide.userId + bookedRide.passengerId), {
                    [user.id]: true,
                    [bookedRide.passengerId]: true,
                    roomId: bookedRide.id,
                });


            } else {
                await setDoc(doc(db, "chatrooms", bookedRide.userId + bookedRide.passengerId), {
                    [user.id]: true,
                    [bookedRide.userId]: true,
                    roomId: bookedRide.id,
                });

            }
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Chat Room Created",
                showConfirmButton: false,
                timer: 1000
            });
            navigate("/chatroom");


        } else {
            navigate("/chatroom");
        }


        //   setting currentChatroom id to redux to start chating between them 

        dispatch(setCurrentChatRoomId(bookedRide.userId + bookedRide.passengerId));
        setChatUser();

    }


    // set Front user for chat 


    const setChatUser = () => {
        if (rideFor === "passenger") {
            dispatch(setFrontUser(bookedRide.driverName));
        } else {
            dispatch(setFrontUser(passengerInfo.username));
        }
    }


    if (rideFor === "passenger") {
        return (
            <div className="container booking-card">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.from + " - " + bookedRide.to}</h6></div>
                    <div className="col-lg-2 col-sm-4"><h6 className='m-0'>Driver: {bookedRide.driverName}</h6></div>
                    <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.date + "/" + bookedRide.time}</h6></div>
                    <div className="col-lg-1 col-sm-4"><button onClick={createChatroom} className='btn btn-sm btn-dark'>Message</button></div>
                    <div className="col-lg-1 col-sm-4"><button onClick={cancelRide} className='btn btn-sm btn-dark'>Cancel</button></div>
                    <div className="col-lg-2 col-sm-4"><button onClick={handleShow} className='btn btn-sm btn-dark'>Complete Ride</button></div>
                    <RatingModal show={show} setShow={setShow} id={bookedRide.id} />
                </div>
            </div>
        )
    }
    if (rideFor === "driver") {
        return (
            <div className="container booking-card">
                {loading ? <h3 className='text-center'>Loading...</h3> : <div className="row align-items-center">
                    <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.from + " - " + bookedRide.to}</h6></div>
                    <div className="col-lg-2 col-sm-4"><h6 className='m-0'>Passenger : {passengerInfo.username}</h6></div>
                    <div className="col-lg-3 col-sm-4"><h6 className='m-0'>{bookedRide.date + "/" + bookedRide.time}</h6></div>
                    <div className="col-lg-3 col-sm-4"><h6 className='m-0'>Phone : {passengerInfo.phoneNo}</h6></div>
                    <div className="col-lg-1 col-sm-4"><button onClick={createChatroom} className='btn btn-sm btn-dark'>Message</button></div>
                    {/* <div className="col-lg-1 col-sm-4"><button onClick={cancelRide} className='btn btn-sm btn-dark'>Cancel</button></div> */}
                    {/* <div className="col-lg-2 col-sm-4"><button onClick={handleShow} className='btn btn-sm btn-dark'>Complete Ride</button></div> */}
                    <RatingModal show={show} setShow={setShow} id={bookedRide.id} />
                </div>}
            </div>
        )
    }


}

export default BookingCard