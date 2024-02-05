import React from 'react'
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../../store/features/user/userSlice';

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <button onClick={logout} className='btn btn-primary mt-5 pt-5'>Logout</button>
  )
}

export default Profile