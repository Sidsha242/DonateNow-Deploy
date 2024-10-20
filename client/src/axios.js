import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// const options = {
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// };

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

//adding interceptor...adding jwt token to refresh token

//interceptor is a function that runs before every request
//withCredentials: true is used to send cookies along with the request
//axiosPrivate is used to send the jwt token along with the request
