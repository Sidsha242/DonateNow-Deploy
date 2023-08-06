import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Feed from './Pages/Feed';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import MedInfo from './Pages/MedInfo';
import PhoneOTP from './Pages/PhoneOTP';
import About from './Pages/About';

function App() {

  return (<Router>
    <div className="App">
    <Navbar></Navbar>
      <Routes>
      <Route exact path='/' element={< Home />}></Route>
      <Route exact path='/login' element={< Login />}></Route>
      <Route exact path='/register' element={< Register />}></Route>
      <Route exact path='/medinfo' element={< MedInfo />}></Route>
      <Route exact path='/feed' element={< Feed />}></Route>
      <Route exact path='/dashboard' element={< Dashboard/>}></Route>
      <Route exact path='/admin' element={< Admin />}></Route>
      <Route exact path='/phoneotp' element={< PhoneOTP />}></Route>
      <Route exact path='/about' element={< About />}></Route>


      </Routes>
    </div >
  </Router >
  );
}
export default App;
