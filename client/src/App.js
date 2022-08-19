import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Reset from './components/Reset';
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/reset' element={<Reset/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
