import { JobRole } from '../model/JobRole';
import { JobRoleRequest } from '../model/JobRoleRequest';
import { API_BASE_URL } from '../config';
const axios = require('axios');


export class JobRoleService {
    public API_URL: string = `${API_BASE_URL}/job-roles`;
    async getJobRoles(): Promise<JobRole[]> {

        try {
            const response = await axios.get(this.API_URL);
            return response.data;
        } catch (e) {
            if (e.response.status == 500)
                throw new Error('Could not get Job Roles');
        }
        return null as any;
    }

    async createJobRole(jobRoleRequest: JobRoleRequest): Promise<number> {

        try {
            const response = await axios.post(`${API_BASE_URL}/create-job-role`, jobRoleRequest);
            return response.data;
        } catch (e) {
            if (e.response.status == 404) {
                throw new Error('Could not make job role');
            }
            return null as any;
        }

    }

}