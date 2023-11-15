import { JobRole } from "../model/JobRole";
import { JobRoleRequest } from "../model/JobRoleRequest";
import { API_BASE_URL } from "../config";
const axios = require("axios");


export class JobRoleService {
    public API_URL: string = `${API_BASE_URL}/job-roles`;
    async getJobRoles(): Promise<JobRole[]> {

        try {
            const response = await axios.get(this.API_URL);
            return response.data
        } catch (e) {
            if (e.response.status == 500)
                throw new Error('Could not get Job Roles');
        }
    }

    async createJobRole(jobRoleRequest: JobRoleRequest): Promise<Number> {

        try {
            const response = await axios.post(`${API_BASE_URL}/create-job-role`, jobRoleRequest);
            return response.data;
        } catch (e) {
            if (e.response.status == 404) {
                throw new Error("Could not make job role");
            }
        }

    }

}