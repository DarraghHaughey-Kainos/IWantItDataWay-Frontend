import { API_BASE_URL } from '../config';

const axios = require('axios');

export class HelloWorldService {

    async getHelloWorld(token: string) {
        try {
            const apiEndPoint: string = `${API_BASE_URL}/hello-world`;
            const headers = { 'Authorization': token };
            const response = await axios.get(apiEndPoint, { headers });

            return response.data;
        }catch(e) {
            console.error(e.response.data);
            throw new Error('Could not get Hello World');
        }
    }
}