import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/'element={<Home />}/>
        <Route path='/About'element={<About />}/>
        <Route path='/Contact'element={<Contact />}/>
        <Route path='/Signup' element={<Signup />}/>
        <Route path='/Login' element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
