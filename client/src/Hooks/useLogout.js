import axios from "../axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({}); //empty auth context
    try {
      await axios.get("/auth/sign_out", {
        withCredentials: true,
      });
      //console.log("logged out");
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
