import { JobRoles } from '../../../model/JobRoles';
import { JobRole } from '../../../model/JobRole';
import { JobRoleService } from '../../../service/JobRoleService';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');  
const expect = chai.expect;

const jobRole: JobRoles[] = [
    {
        id: 1,
        jobRoleTitle: 'Engineer',
    }
];

const JobRoleSpec: JobRole[] = [
    {
        jobRoleId: 1,
        jobRoleTitle: 'Engineer',
        capabilityName: 'Engineering',
        sharepointLink: 'www.link.com',
        specificationText: 'spec 1',
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
    
            mock.onGet(jobRoleService.API_URL + '/job-roles').reply(200, jobRole);
    
            const results: JobRoles[] = await jobRoleService.getJobRoles();
    
            expect(results).to.deep.equal(jobRole);
          });
    });

    /*
    expect throw expception with a message when a 500 error is returned from axios
    */

    it('should throw expception when 500 error returned from axios', async () => {
        const mock = new MockAdapter(axios);        

        mock.onGet(jobRoleService.API_URL + '/job-roles').reply(500);
        let error;

        try{
            await jobRoleService.getJobRoles();
        }catch (e){
             error = e.message;
        }

        expect(error).to.equal('Could not get Job Roles');
      });

    describe('getJobRole', function () {
        it('should return job role from response', async () => {
            const id: string = '1';
            
            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-role/1').reply(200, JobRoleSpec);

            const results: JobRole[] = await jobRoleService.getJobRole(id);

            expect(results).to.deep.equal(JobRoleSpec);
        });
    });
    
        it('should throw exception when 500 error returned from axios', async () => {
            const id: string = '1';

            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-role/1').reply(500);
            let error;

            try {
                await jobRoleService.getJobRole(id);
            } catch (e) {
                error = e.message;
            }

            expect(error).to.equal('Could not get Job Role');
        });

});