import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/posts'

const updateBooking = () => {
    axios.post(url).then(res => {
        console.log("res", res)
    })
}

const getBooking = () => {
    axios.get(`${url}.json`).then(res => {
        console.log("res", res)
    })
}

export default {updateBooking, getBooking};