import { JobRoles } from '../model/JobRoles';
import { JobRole } from '../model/JobRole';
import { API_BASE_URL } from '../config';
const axios = require('axios');


export class JobRoleService {
    public API_URL: string = API_BASE_URL;
    async getJobRoles(token: string): Promise<JobRoles[]> {

        try {
            const headers = { 'Authorization': token };
            const response = await axios.get(this.API_URL+'/job-roles', { headers });
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get Job Roles');
            }
            return null;
        }
    }

    async getJobRoleById(id: number, token: string): Promise<JobRole[]> {

        try {
            const headers = { 'Authorization': token };
            const response = await axios.get(this.API_URL+`/job-roles/${id}`, { headers });
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get Job Role');
            }

            if (e.response.status == 404) {
                throw new Error('Job Role does not exist');
            }

            return [];
        }
    }

    async deleteJobRoleById(token: string, id: string): Promise<Response> {

        try {
            const headers = { 'Authorization': token };
            const response = await axios.delete(this.API_URL+'/job-roles/' + id, { headers });
            return response.data;
        } catch (e) {
            console.error(e.response.status);
            if (e.response.status == 500) {
                throw new Error('Could Not Get Job Roles');
            } else if (e.response.status == 403) {
                // User does not have permissions for this endpoint
                throw new Error('You Do Not Have The Correct Permissions');
            } else if (e.response.status == 404) {
                throw new Error('Could Not Find Job Roles With ID: ' + id);
            }
        }
    }
}
