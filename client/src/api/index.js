import axios from 'axios'

export const axioxInstance = axios.create({
    headers: {
        "Content-Type":"application/json"
    },
    baseURL:"/"
});