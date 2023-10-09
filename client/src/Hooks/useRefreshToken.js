import axios from "../axios";
import useAuth from './useAuth';

//JWT access tokens last 20 mins if we want more than that we need this

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials: true   //is required for sending cookies to server
        });
        setAuth((prev) => {
            console.log("In refresh token");
            console.log("prev = "+JSON.stringify(prev));
            return { 
                ...prev,
                id: response.data.id,
                role: response.data.role, 
                token: response.data.token
            }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;