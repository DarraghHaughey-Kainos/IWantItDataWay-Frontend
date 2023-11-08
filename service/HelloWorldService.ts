import { API_BASE_URL } from "../config";

const axios = require("axios")


module.exports.getHelloWorld = async function() {
    try { 
        const response = await axios.get(`${API_BASE_URL}/hello-world`);

        return response.data;
    }catch(e) {
        throw new Error('Could not get Hello World');
    }
}
