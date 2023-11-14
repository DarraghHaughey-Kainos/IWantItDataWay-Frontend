import { Login } from '../model/Login';
import { API_BASE_URL } from '../config';
const axios = require('axios');

export class AuthService {

    async login(login: Login): Promise<string> {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, login);
    
            return response.data;
        } catch (e) {
            if (typeof e.response != 'undefined' && typeof e.response.data != 'undefined') {
                throw new Error(e.response.data);
            }
            throw new Error('Could not login');
        }
    }
    
    async register(login: Login): Promise<string> {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, login);
    
            return response.data;
        } catch (e) {
            if (typeof e.response != 'undefined' && typeof e.response.data != 'undefined') {
                throw new Error(e.response.data);
            }
            throw new Error('Could not register');
        }
    }

}


