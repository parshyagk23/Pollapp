import axios from "axios";
import Cookies from "js-cookie";
const BackenUrl = import.meta.env.VITE_REACT_APP_POLL_URL

export const CreatePollData = async(Polldata)=>{

    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const responce = await axios.post(`${BackenUrl}/createpoll`,Polldata)
        if(responce){
            return responce.data; 
        }
        
    } catch (error) {
       return error.message
    }


}
export const GetAllPollList = async ()=>{
    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const responce = await axios.get(`${BackenUrl}/poll`)
        return responce.data
        
    } catch (error) {
        return error.message
        
    }
}
export const GetPollListById = async (id)=>{
    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const responce = await axios.get(`${BackenUrl}/poll/${id}`)
        return responce.data
        
    } catch (error) {
        return error.message;
        
    }
}
export const DeletePollById = async (id)=>{
    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const responce = await axios.delete(`${BackenUrl}/poll/${id}`)
        return responce.data
        
    } catch (error) {
        return error.message;
        
    }
}
