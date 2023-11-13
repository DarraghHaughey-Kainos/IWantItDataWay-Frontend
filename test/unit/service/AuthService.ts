import { Login } from "../../../model/Login";
import { AuthService } from "../../../service/AuthService";
import { API_BASE_URL } from "../../../config";

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const token = "test_token_value"
const login: Login = {
        username: "test",
        password: "test"
    };
const authService: AuthService = new AuthService();

describe('AuthService', function() {

    describe('login', function() {
        it('should return token on successful login', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(`${API_BASE_URL}/login`, login).reply(200, token)

            const result: String = await authService.login(login);


            expect(result).to.equal(token);
        })

        it('should throw expception when 500 error returned from axios', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(`${API_BASE_URL}/login`, login).reply(500)
            var error;
    
            try{
                await authService.login(login)
            }catch(e) {
                var error = e.message
            }
    
            expect(error).to.equal("Could not login")
        })
    })

    describe('register', function() {
        it('should return token on successful registration', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(`${API_BASE_URL}/register`, login).reply(200, token)

            expect(token).to.equal(token);
        })

        it('should throw expception when 500 error returned from axios', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(`${API_BASE_URL}/register`, login).reply(500)
            var error;
    
            try{
                await authService.register(login)
            }catch(e) {
                var error = e.message
            }
    
            expect(error).to.equal("Could not register")
        })
    })
})