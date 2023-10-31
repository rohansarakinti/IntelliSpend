import axios from "axios"

const client = axios.create({
    baseURL: "https://intellispend.uc.r.appspot.com"
})

export default client