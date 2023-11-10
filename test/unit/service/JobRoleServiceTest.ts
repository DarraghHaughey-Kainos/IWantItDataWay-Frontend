import { JobRole } from "../../../model/JobRole";
import { JobRoleService } from "../../../service/JobRoleService";

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

const jobRole = new JobRole(1,"Engineer")

/* 
ui test for the getJobRoles method 
expect the job roles to be returned
*/

const jobRoleService: JobRoleService = new JobRoleService();

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return job roles from response', async () => {
            var mock = new MockAdapter(axios);
    
            const data: JobRole[] = [jobRole];

            console.log(jobRoleService.URL)
    
            mock.onGet(jobRoleService.URL).reply(200, data);
    
            var results = await jobRoleService.getJobRoles();

            console.log(results);
            
    
            expect(results[0]).to.deep.equal(jobRole)
          })

    })

    /*
    should throw expception when 500 error returned from axios
    */

    // it('should throw expception when 500 error returned from axios', async () => {
    //     var mock = new MockAdapter(axios);        

    //     mock.onGet(JobRoleService.URL).reply(200);

    //     var error;

    //     try{
    //         await JobRoleService.getJobRoles()
    //     }catch (e){
    //         var error = e.message
    //     }

    //     expect(error).to.equal('Could not get Job Roles')
    //   })

})