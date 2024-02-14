import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/app/v1"
})

export default axiosInstance