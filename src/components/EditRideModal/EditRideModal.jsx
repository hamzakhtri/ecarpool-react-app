import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { convertTimeTo12HourFormat, convertTo24HourFormat } from '../../hooks/timeConversion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';


function EditRideModal(props) {

    // de structuring props 
    const { ride, onHide } = props;

    // converting time in standard format 

    console.log(ride.id);

    const rideTime = convertTo24HourFormat(ride.time)

    // new states which will be use to update new data 

    const [newCarName, setNewCarName] = useState(ride.carName);
    const [newFrom, setNewFrom] = useState(ride.from);
    const [newTo, setNewTo] = useState(ride.to);
    const [newRent, setNewRent] = useState(ride.rent);
    const [newNumberOfSeats, setNewNumberOfSeats] = useState(ride.numberOfSeats);
    const [newDate, setNewDate] = useState(ride.date);
    const [newTime, setNewTime] = useState(rideTime);
    const [newStatus, setNewStatus] = useState(ride.status);
    const [newDriverAddress, setNewDriverAddress] = useState(ride.driverAddress);



    // loading and erros checking state 

    const [loader, setLoading] = useState(false);
    const [error, setError] = useState(false);


    // it will update the data of ride in firestore and also update it into redux 

    const updateRide = async () => {

        if (newCarName && newFrom && newTo && newRent && newNumberOfSeats && newDate && newStatus && newDriverAddress) {

            setLoading(true);
            const docref = doc(db, "rides", ride.id);
            await updateDoc(docref, {
                carName: newCarName,
                from: newFrom,
                to: newTo,
                numberOfSeats: newNumberOfSeats,
                date: newDate,
                time: convertTimeTo12HourFormat(newTime),
                status: newStatus,
                driverAddress: newDriverAddress,
                rent: newRent
            });

            onHide();
            setError(false);
            setLoading(false);

        }else{
            setError(true);
        }

    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{ride.driverName}</h4>

                <div className='container pb-5 mt-5 modal-form'>
                    <div className="row mb-4 mt-4">
                        <div className="col-lg-4">
                            <div className="input-field">
                                <input
                                    type="text"
                                    placeholder='Enter Car Name'
                                    className='form-control'
                                    value={newCarName}
                                    onChange={(e) => setNewCarName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-field">
                                <input
                                    type="text"
                                    placeholder='From'
                                    className='form-control'
                                    value={newFrom}
                                    onChange={(e) => setNewFrom(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-field">
                                <input type="text"
                                    placeholder='To'
                                    className='form-control'
                                    value={newTo}
                                    onChange={(e) => setNewTo(e.target.value)}
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
                                    value={newRent}
                                    onChange={(e) => setNewRent(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-field">
                                <input
                                    type="date"
                                    placeholder='Car Image'
                                    className='form-control'
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-field">
                                <input
                                    type="time"
                                    className='form-control'
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
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
                                    value={newNumberOfSeats}
                                    onChange={(e) => setNewNumberOfSeats(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-field">
                                <select
                                    className='form-control border border-dark shadow-none'
                                    name="status"
                                    id="status"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
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
                                    value={newDriverAddress}
                                    onChange={(e) => setNewDriverAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                    <p className='text-danger'>{error && "All Fields Are Required"}</p>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className='theme-btn'>Close</Button>
                <Button onClick={updateRide} className='theme-btn'>{loader ? "Updating..." : "Update"}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditRideModal