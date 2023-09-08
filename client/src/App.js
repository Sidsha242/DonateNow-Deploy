import {BrowserRouter , Routes, Route} from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import MedInfo from './Pages/MedInfo';
import About from './Pages/About';
import Layout from './Pages/Layout';
import Missing from './Pages/Missing';
import Unauthorized from './Pages/Unauthorized';
import PersistLogin from './Components/PersistLogin';

import { AuthProvider } from './Context/AuthProvider';
import RequireAuth from './Pages/RequireAuth';
import Logout from './Pages/Logout';
import LinkPage from './Pages/LinkPage';

const ROLES = {
    'User' : 2001,
    'Admin' : 1984,
}


function App() {

  return (
   <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/*public routes */}
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path='medinfo' element={<MedInfo/>}/>
            <Route path="unauthorized" element={<Unauthorized />}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="linkpage" element={<LinkPage/>}/>

            {/*protected routes*/}
            {/* protected for users */}
            <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>
                  <Route path='feed' element={<Feed />}/>
                  <Route path='dashboard' element={<Dashboard/>}/>
              </Route>

              {/* protected for admins */}
              <Route element={<RequireAuth allowedRoles={ROLES.Admin}/>}>
                <Route path='admin' element={<Admin/>}/>
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing/>}/>
          </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}
export default App;
