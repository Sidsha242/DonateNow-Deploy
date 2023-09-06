// import { axiosPrivate } from "../axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";


// //JWT access tokens last 20 mins if we want more than that we need this
// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();

//     useEffect(() => {
//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response,
//             async(error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 403)//access token expired
//                 {
//                         //if required then will finish
//                 }
//             }
//         )
//     })

//     return axiosPrivate
// }

// export default useAxiosPrivate;

import { axiosPrivate } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;


//axiosPrivate is the axios instance with the baseURL set to the private API endpoint.
//useRefreshToken is a custom hook that returns a function that can be used to refresh the access token.
//useAuth is a custom hook that returns the auth object from the global context.
//useEffect is used to set up the interceptors.
//The request interceptor is used to add the access token to the request headers.
//The response interceptor is used to refresh the access token if it has expired.
//The return function is used to remove the interceptors when the component unmounts.
//The axiosPrivate instance is returned so that it can be used to make requests to the private API.

//what are interceptors?
//Interceptors are functions that are called before a request is sent and before a response is returned.
//They can be used to modify the request or response before they are handled by the application.
//They can also be used to handle errors that occur during the request or response.
//Interceptors are useful for adding authentication tokens to requests, refreshing expired tokens, and handling errors.
//Interceptors are added to an axios instance using the interceptors property.
//The interceptors property is an object with two properties: request and response.
//The request property is used to add a function that will be called before a request is sent.
//The response property is used to add a function that will be called before a response is returned.
//The request and response properties are objects with two methods: use and eject.
//The use method is used to add an interceptor function.
//The eject method is used to remove an interceptor function.
//The use method returns an interceptor id that can be used to remove the interceptor.
//The eject method takes the interceptor id as an argument.