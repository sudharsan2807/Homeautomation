import axios, { Axios } from "axios"

const baseurl = "https://api.thingspeak.com/talkbacks/49659/commands"
const apikey = "api_key=O0CSA2WKDBOWXZLR"

//https://api.thingspeak.com/talkbacks/49659/commands/35845228.json?api_key=O0CSA2WKDBOWXZLR&command_string=DIF_3

export const IOT_GET1 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET2 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET3 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET4 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET5 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET6 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET7 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}

export const IOT_GET8 = (commandid) => {
    return axios.get(`${baseurl}/${commandid}.json?${apikey}`)
}





export const IOT_PUT1 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT2 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT3 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT4 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT5 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT6 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}

export const IOT_PUT7 = (data, commandid) => {
    return axios.put(`${baseurl}/${commandid}.json?${apikey}&command_string=${data}`)
}
