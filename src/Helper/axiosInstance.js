import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://social-back-ffwk.onrender.com/app/v1"
})

export default axiosInstance