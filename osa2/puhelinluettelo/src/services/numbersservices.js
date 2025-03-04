import axios from "axios";
const baseUrl = "/api/persons"

const getFromServer = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data) 
}

const addToServer = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then( response => response.data) 
}

const deleteFromServer = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => response.data) 
}

const change = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getFromServer, addToServer, deleteFromServer, change}