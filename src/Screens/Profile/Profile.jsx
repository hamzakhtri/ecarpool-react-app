import React, { useState } from 'react'
import { auth, db } from '../../config/firebase';
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from '../../store/features/user/userSlice';
import avatar from "../../assets/img/avatar.png"
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

function Profile() {

  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(user && user.username);
  const [newEmail, setNewEmail] = useState(user && user.email);
  const [newPhoneNo, setNewPhoneNo] = useState(user && user.phoneNo);
  const [newAddress, setNewAddress] = useState(user && user.address);
  const [newGender, setNewGender] = useState(user && user.gender);
  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    await signOut(auth);
    dispatch(addCurrentUser(null));
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Sign Out Successfully",
      showConfirmButton: false,
      timer: 1500
    })
    navigate("/");

  }

  const handleEdit = () => {
    setReadOnly(false);
    console.log(user.email)
  }


  // this function take new info and update that info infto firestore firebase 

  const updateProfile = async () => {

    const docref = doc(db, "users", user.id);
    await updateDoc(docref, {
      username: newName,
      phoneNo: newPhoneNo,
      address: newAddress,
      gender: newGender
    });


    // updata current User because data is update now 

    dispatch(addCurrentUser({
      ...user,
      username: newName,
      phoneNo: newPhoneNo,
      address: newAddress,
      gender: newGender,

    }));

    setReadOnly(true);

    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Profile Updated",
      showConfirmButton: false,
      timer: 1500
    })

  }

  // function which take user id and match in rides collection if there diver id match usr id it will delete all ride 

  const deleteRidesByDriverId = async (driverId) => {
    // Query for documents in the "rides" collection where the driverId matches
    const q = query(collection(db, "rides"), where("userId", "==", driverId));

    try {
      const querySnapshot = await getDocs(q);

      // Iterate over the query snapshot and delete each document
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Document deleted successfully:", doc.id);
      });

      console.log("All documents deleted successfully");
    } catch (error) {
      console.error("Error deleting documents:", error);
      // Handle error (e.g., display error message to the user)
    }
  }

  // delete user Account and also remove his adds and info 

  const deleteAccount = async () => {


    // Display confirmation dialog using SweetAlert
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (confirmationResult.isConfirmed) {
      // show loading to user while deleting 

      setLoading(true);

      // User confirmed, proceed with account deletion
      
      const credentials = EmailAuthProvider.credential(user.email, user.password);
      try {
        await reauthenticateWithCredential(auth.currentUser, credentials);

        // delete all rides of user who want to delete accout 

        await deleteRidesByDriverId(user.id);

        // also delte user from firestore database 

        await deleteDoc(doc(db, "users", user.id));

        await deleteUser(auth.currentUser);
        logout();
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle account deletion error (e.g., display error message to the user)
      }
    } else {
      // User cancelled, do nothing
    }

    // after delete succesfully make loading false 
    setLoading(false);
  }


  return (

    <>
      <div className="inner-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1 className='text-white'>My Profile</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4 mt-3">
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="profile-info d-flex align-items-center">
            <div>
              <img src={avatar} alt="avatar" width="120" className='img-fluid me-3' />
            </div>
            <div>
              <h3>{user && user.username}</h3>
              <p className="m-0 p-0">{user && user.email}</p>
            </div>
          </div>
          <div>
            <button onClick={logout} className='theme-btn'>Logout</button>
          </div>
        </div>
        <div className="profile-form-sec">
          <div className="row mb-4 mt-4">
            <div className="col-lg-4">
              <div className="input-field">
                <input
                  type="text"
                  placeholder='Enter Name'
                  className='form-control'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="input-field">
                <input
                  type="email"
                  placeholder='Enter Email'
                  className='form-control'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="input-field">
                <input type="password"
                  placeholder='Enter Password'
                  className='form-control'
                  value="**********"
                  disabled
                />
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="input-field">
                <input
                  type="number"
                  placeholder='Enter Phone No'
                  className='form-control'
                  value={newPhoneNo}
                  onChange={(e) => setNewPhoneNo(e.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="input-field">
                <input
                  type="text"
                  placeholder='Enter Address'
                  className='form-control'
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="input-field">
                <select
                  className='form-control'
                  name="gender"
                  id="gender"
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  disabled={readOnly}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {readOnly ?
                <button onClick={handleEdit} className='btn btn-dark my-4 fs-5 px-4'>Edit</button> :
                <button onClick={updateProfile} className='btn btn-success my-4 fs-5 px-4'>Update</button>}
            </div>
            <div>
              <button onClick={deleteAccount} className='btn btn-danger my-4 fs-5 px-4'>{loading ? "Deleting..." : "Delete Account"}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile