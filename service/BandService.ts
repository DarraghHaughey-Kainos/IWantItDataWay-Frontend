import { Band } from '../model/Band';
import { API_BASE_URL } from '../config';
const axios = require('axios');

export class BandService {
    public API_URL: string = API_BASE_URL;
    async getAllBands(): Promise<Band[]> {

        try {
            const response = await axios.get(this.API_URL + '/bands');
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get bands');
            }
            return null;
        }
    }
}