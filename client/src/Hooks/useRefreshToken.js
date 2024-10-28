import axios from "../axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth(); //setAuth updates the authentication state.

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        donor_id: response.data.donor_id,
        role: response.data.role,
        token: response.data.accessToken, ///token?
      };
    });
    return response.data.accessToken; //Returns the new access token, so it can be used directly by the component or service that calls the refresh function.
  };
  return refresh; //returns a function (refresh), which can be used to refresh the user's access token.
};

export default useRefreshToken;
