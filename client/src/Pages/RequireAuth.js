import { useLocation , Navigate , Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

 const { auth } = useAuth();
 const location = useLocation();
 
 return(
    //auth?.role?.find(role => allowedRoles?.includes(role))
    auth?.role === allowedRoles
      ? <Outlet/>  //IF TRUE GO TO DESIRED PLACE
      : auth?.email
        ? <Navigate to ="/unathorized" state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace /> //replacing navigation to login
 );

}

export default RequireAuth;