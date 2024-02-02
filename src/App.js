import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './Screens/Home/Home';
import About from './Screens/About/About';
import Contact from './Screens/Contact/Contact';
import SignIn from './Screens/SignIn/SignIn';
import SignUp from './Screens/SignUp/SignUp';
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import NotFound from './Screens/NotFound/NotFound';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
