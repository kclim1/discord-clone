import axios from "axios";
import { useProfileStore } from "../store/useProfileStore";
import { useEffect} from "react";
import { useParams } from "react-router-dom";


export const fetchProfile = ()=>{
    const {username , profileId, email,profilePic} = useProfileStore()
    const params = useParams()
    const fetchUserData = async ()=>{
        try{
            
            const fetchUserInfo = axios.get(`http://localhost:3000/user/${params}`)
            
        }catch(error){
            console.error('error fetching profile data' , error)
        }
    }

}