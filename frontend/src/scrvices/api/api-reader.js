import axios from "axios"

export const GET_1 = () => {
    return axios.get("https://api.thingspeak.com/channels/2243097/feeds.json?api_key=DA68VIED297MKPZ0&results=1")
}

const base_url = "http://localhost:4000"

export const measuredataget = () => {
    return axios.get(`${base_url}/fetch/measurment`)
}

export const TIME_GET = () => {
    return axios.get(`${base_url}/fetch/time/all`)
}

export const TIME_GET_ID = (id) => {
    return axios.get(`${base_url}/fetch/time/${id}`)
}

export const TIME_POST = (data) => {
    let info = {
        name: data.name,
        hours: data.hours,
        minutes: data.minutes,
        Delay: data.Delay
    }
    return axios.post(`${base_url}/time/post`, info)
}

export const TIME_PUT = (id, data) => {
    return axios.put(`${base_url}/upadate/time/${id}`, data)
}

export const TIME_DEL = (id) => {
    return axios.delete(`${base_url}/delete/time/${id}`)
}

export const ROOM_GET = () => {
    return axios.get(`${base_url}/room/get/all`)
}

export const ROOM_PUT_ICON = (data, id) => {
    return axios.put(`${base_url}/room/put/${id}`, data)
}

export const ROOM_PUT_NAME = (data, id) => {
    return axios.put(`${base_url}/room/put/${id}`, data)
}

