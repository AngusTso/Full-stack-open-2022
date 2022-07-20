import axios from 'axios'
const url = "http://localhost:3001/persons"

const getNumber = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
}

const saveNumber = newObject => {
    const request = axios.post(url , newObject);
    return request.then(response => response)
}
const deleteNumber = (id) => {
    const request = axios.delete(`${url}/${id}`);
    return request.then(response => response)
}

const updateNumber = (id , newobj) => {
    const request = axios.put(`${url}/${id}` , newobj)
    return request.then(response => response)
}
export default {getNumber , saveNumber , deleteNumber , updateNumber}