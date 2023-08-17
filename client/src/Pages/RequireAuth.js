import { useLocation , Navigate , Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

 const { auth } = useAuth();
 const location = useLocation();

  console.log(`%c Allowed:${allowedRoles}`,'background: #222; color: #bada55');
  console.log(`%c Auth:${auth}`,'background: #222; color: #bada55');
 
 return(
    auth?.role === allowedRoles
      ? <Outlet/>  //IF TRUE GO TO DESIRED PLACE
      : auth?.email
        ? <Navigate to ="/unathorized" state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace /> //replacing navigation to login
 );

}

export default RequireAuth;