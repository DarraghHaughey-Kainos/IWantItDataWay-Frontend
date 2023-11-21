import { Specification } from '../model/Specification';
import { API_BASE_URL } from '../config';
const axios = require('axios');

export class SpecificationService {
    public API_URL: string = API_BASE_URL;

    async getAllSpecifications(): Promise<Specification[]> {
        try {
            const response = await axios.get(this.API_URL + '/specifications');
            return response.data;
        } catch (e) {
            if (e.response.status == 500) {
                throw new Error('Could not get Specifications');
            }
            return [];
        }
        return null;
    }
}