import { React } from 'react'
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../Context/AuthContext';
//import useAuth from '../Hooks/useAuth';
import useLogout from '../Hooks/useLogout';

const Logout = () => {

  //const { setAuth } = useContext(AuthContext);  -> This is the same as the following:
  //const { setAuth } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    // setAuth({});
    await logout();
    navigate('/login');
  }

  return (
    <div>
      <h1>Are you sure you want to logout?</h1>
      <br/>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}

export default Logout