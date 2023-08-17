import { axios } from "../axios";
import useAuth from './useAuth';

//JWT access tokens last 20 mins if we want more than that we need this

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.strigify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.token}
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;