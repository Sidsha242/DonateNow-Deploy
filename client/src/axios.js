
import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:3031'
})

export const axiosPrivate = axios.create({
    baseURL : 'http://localhost:3031',
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})//adding interceptor...adding jwt token to refresh token