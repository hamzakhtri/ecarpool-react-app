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
import { useSelector } from 'react-redux';
import Profile from './Screens/Profile/Profile';


function App() {

  const user = useSelector(state => state.user.currentUser);

  // useEffect(()=>{
  //   console.log(user);
  // }, [user])

  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={user && user !== null ? <FindRides/> : <Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/signin' element={user ? <Navigate to="/"/> : <SignIn />} />
      <Route path='/signup' element={user ? <Navigate to="/"/> : <SignUp />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
