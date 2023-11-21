import { JobRole } from '../model/JobRole';
import { JobRoleRequest } from '../model/JobRoleRequest';
import { API_BASE_URL } from '../config';
const axios = require('axios');
import { CreateJobRoleValidator } from '../validator/CreateJobRoleValidator';

export class JobRoleService {
    public API_URL: string = API_BASE_URL;
    createValidator: CreateJobRoleValidator = new CreateJobRoleValidator();
    async getJobRoles(): Promise<JobRole[]> {

        try {
            const response = await axios.get(this.API_URL+'/job-roles');
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get Job Roles');
            }
            return null;
        }
    }

    async createJobRole(jobRoleRequest: JobRoleRequest): Promise<number> {
        
        const error: string = this.createValidator.validateJobRole(jobRoleRequest);

        if(error){
            throw new Error(error);
        }

        try {
            const response = await axios.post(this.API_URL+'/job-roles/create', jobRoleRequest);
            return response.data;
        } catch (e) {
            if (e.response.status == 400){
                throw new Error('Could not create job role - Invalid Information');
            }
            if (e.response.status == 500){
                throw new Error('Could not create job role');
            }
            return null;
        }

    }

}