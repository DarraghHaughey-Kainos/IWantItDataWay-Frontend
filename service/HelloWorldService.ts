const axios = require("axios")

module.exports.getHelloWorld = async function() {
    try { 
        const response = await axios.get('http://localhost:8080/api/hello-world');

        return response.data;
    }catch(e) {
        throw new Error('Could not get Hello World');
    }
}
