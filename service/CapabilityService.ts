import { Capability } from '../model/Capability';
import { API_BASE_URL } from '../config';
const axios = require('axios');

export class CapabilityService {
    public API_URL: string = API_BASE_URL;
    async getAllCapabilities(token: string): Promise<Capability[]> {

        try {
            const headers = { 'Authorization': token };
            const response = await axios.get(this.API_URL + '/capabilities', {headers});
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get capabilities');
            }
            return null;
        }
    }
}