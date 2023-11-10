import { response } from "express";
import { API_BASE_URL } from "../config";
import { JobRole } from "../model/JobRole";
const axios = require("axios");

axios.defaults.baseURL = "http://localhost:8080";


export class JobRoleService {
    URL: String = '/job-roles'
    getJobRoles = async function(): Promise<JobRole[]>{
        try { 
            const response = await axios.get(URL);
    
            return response.data;
        }catch(e) {                   
            throw new Error('Could not get Job Roles');            
        }
    } 
}