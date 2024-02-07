import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './Screens/Home/Home';
import About from './Screens/About/About';
import Contact from './Screens/Contact/Contact';
import SignIn from './Screens/SignIn/SignIn';
import SignUp from './Screens/SignUp/SignUp';
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import NotFound from './Screens/NotFound/NotFound';
import FindRides from './Screens/FindRides/FindRides';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Screens/Profile/Profile';
import ShareRides from './Screens/ShareRides/ShareRides';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { loadRides } from './store/features/rides/ridesSlice';
import RideInfo from './Screens/RideInfo/RideInfo';
import Preloader from './components/Preloader/Preloader';


function App() {

  // getting current user from redux 

  const user = useSelector(state => state.user.currentUser);
  const [loadingData, setLoadingData] = useState(true); 
  
  // getting all rides when loading application and setting it to redux store 
  const dispatch = useDispatch();
  
  useEffect(() => {
    const q = query(collection(db, "rides"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rides = [];
      querySnapshot.forEach((doc) => {
        rides.push({ ...doc.data(), id: doc.id });
      });
      dispatch(loadRides(rides));
      setLoadingData(false); // Set loading state to false once data is fetched
    });
  
    return () => unsubscribe();
  }, [dispatch])
  
  if (loadingData) {
    return <Preloader/>; // Show preloader only when loading data
  }  


  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={user && user !== null ? <FindRides /> : <Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sharerides' element={<ShareRides />} />
        <Route path='/rideinfo/:id' element={<RideInfo />} />

        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/signin' element={user ? <Navigate to="/" /> : <SignIn />} />
      <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUp />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
