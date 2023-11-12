import { React } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from '../Context/AuthContext';
//import useAuth from '../Hooks/useAuth';
import useLogout from "../Hooks/useLogout";

const Logout = () => {
  //const { setAuth } = useContext(AuthContext);  -> This is the same as the following:
  //const { setAuth } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    // setAuth({});
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen p-10">
      <div className="flex flex-col items-center p-5 bg-[#E3DEC6] justify-center rounded-lg shadow">
        <h1 className="font-bold text-xl">Are you sure you want to logout?</h1>
        <br />
        <button
          className="focus:outline-none text-white text-xl font-bold text-poppins mt-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
