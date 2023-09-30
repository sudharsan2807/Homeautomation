import axios, { Axios } from "axios"

const base_url = "http://localhost:4000"

export const PASS_GET = () => {
    return axios.get(`${base_url}/fetch/all`)
}

export const MESS_SEND = (data) => {
    return axios.get(`https://api.telegram.org/bot6515036773:AAHv1M1ejZDezzJwZ07yNPjt9dg80qxthsE/sendMessage?chat_id=@IOT_WED_ENTERY&text=${data}`)
}