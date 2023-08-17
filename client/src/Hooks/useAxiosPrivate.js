import { axiosPrivate } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


//JWT access tokens last 20 mins if we want more than that we need this
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403)//access token expired
                {
                        //if required then will finish
                }
            }
        )
    })

    return axiosPrivate
}

export default useAxiosPrivate;