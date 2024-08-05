import axios from "axios";

const token = localStorage.getItem('token')
const instance = axios.create({
    baseURL: 'https://localhost:44389',
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export default instance;