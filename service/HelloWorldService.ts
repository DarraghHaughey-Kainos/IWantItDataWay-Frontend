import { API_BASE_URL } from '../config';

const axios = require("axios")

export class HelloWorldService {

    async getHelloWorld(token: String) {
        try { 
            const apiEndPoint: String = `${API_BASE_URL}/hello-world`;
            const params = { token: token }
            const response = await axios.get(apiEndPoint, { 
                headers: {
                    'Authorization': token
                }
             });
    
            return response.data;
        }catch(e) {
            console.error(e.response.data)
            throw new Error('Could not get Hello World');
        }
    }
};