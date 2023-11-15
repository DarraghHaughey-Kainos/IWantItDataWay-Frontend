import { JobRole } from '../../../model/JobRole';
import { JobRoleService } from '../../../service/JobRoleService';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');  
const expect = chai.expect;
const jobRole: JobRole[] = [
    {
        id: 1,
        jobRoleTitle: 'Engineer',
        bandName: 'Associate'
    }
];

/* 
ui test for the getJobRoles method 
expect the job roles to be returned
*/

const jobRoleService: JobRoleService = new JobRoleService();

describe('JobRoleService', function () {
    describe('getJobRoles', function () {
        it('should return job roles from response', async () => {
            const mock = new MockAdapter(axios);
    
            mock.onGet(jobRoleService.API_URL).reply(200, jobRole);
    
            const results: JobRole[] = await jobRoleService.getJobRoles();
    
            expect(results).to.deep.equal(jobRole);
          });
    });

    /*
    expect throw expception with a message when a 500 error is returned from axios
    */

    it('should throw expception when 500 error returned from axios', async () => {
        const mock = new MockAdapter(axios);        

        mock.onGet(jobRoleService.API_URL).reply(500);
        let error;

        try{
            await jobRoleService.getJobRoles();
        }catch (e){
             error = e.message;
        }

        expect(error).to.equal('Could not get Job Roles');
      });

});