import axios from "axios"

const client = axios.create({
    baseURL: "https://intellispend.onrender.com/"
})

export default client