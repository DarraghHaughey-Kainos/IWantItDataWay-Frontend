import { JobRole } from '../model/JobRole';
import { API_BASE_URL } from '../config';
const axios = require('axios');


    export class JobRoleService {
        public API_URL: string = `${API_BASE_URL}/job-roles`;
        async getJobRoles(token: string): Promise<JobRole[]> {

            try {
                const headers = { 'Authorization': token };
                const response = await axios.get(this.API_URL, { headers });
                return response.data;
            } catch(e) {
                if (e.response.status == 500)
                throw new Error('Could not get Job Roles');
            }
        }
}