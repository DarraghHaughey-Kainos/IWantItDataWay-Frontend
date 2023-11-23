import { JobRoles } from '../../../model/JobRoles';
import { JobRole } from '../../../model/JobRole';
import { JobRoleRequest } from '../../../model/JobRoleRequest';
import { JobRoleService } from '../../../service/JobRoleService';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');
const expect = chai.expect;

const jobRoles: JobRoles[] = [
    {
        id: 1,
        jobRoleTitle: 'Engineer',
        capabilityName: 'Engineering',
        bandName: 'Associate'
    }
];
const jobRoleRequest: JobRoleRequest =
{
    jobRoleTitle: 'Engineer',
    capabilityId: 1,
    bandId: 1,
    sharePointLink: 'link.sharepoint.com'
};
const token = 'test_token_value';

const jobRole: JobRole[] = [
    {
        jobRoleId: 1,
        jobRoleTitle: 'Engineer',
        capabilityName: 'Engineering',
        sharepointLink: 'www.link.com',
        specificationText: 'spec 1',
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

            mock.onGet(jobRoleService.API_URL + '/job-roles').reply(200, jobRoles);

            const results: JobRoles[] = await jobRoleService.getJobRoles('');

            expect(results).to.deep.equal(jobRoles);
        });

        it('should throw expception when 500 error returned from axios', async () => {
            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-roles').reply(500);
            let error;

            try {
                await jobRoleService.getJobRoles(token);
            } catch (e) {
                error = e.message;
            }

            expect(error).to.equal('Could not get Job Roles');
        });

    });

    describe('createJobRole', function () {

        it('should return id of role created', async () => {
            const mock = new MockAdapter(axios);
            const token: string = '';
            const expected: number = 1;
            mock.onPost(jobRoleService.API_URL + '/job-roles').reply(201, expected);

            const result: number = await jobRoleService.createJobRole(jobRoleRequest, token);

            expect(expected).to.deep.equal(result);

        });

        it('should throw an exception when 400 returned from axios', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(jobRoleService.API_URL + '/job-roles').reply(400);
            const token: string = '';
            let error;

            try {
                await jobRoleService.createJobRole(jobRoleRequest, token);
            } catch (e) {
                error = e.message;
            }

            expect(error).to.deep.equal('Could not create job role - Invalid Information');

        });

        it('should throw an exception when 500 returned from axios', async () => {
            const mock = new MockAdapter(axios);

            mock.onPost(jobRoleService.API_URL + '/job-roles').reply(500);
            const token: string = '';

            let error;

            try {
                await jobRoleService.createJobRole(jobRoleRequest, token);
            } catch (e) {
                error = e.message;
            }

            expect(error).to.deep.equal('Could not create job role');

        });

      });

    describe('getJobRole', function () {
        it('should return job role from response', async () => {
            const id: number = 1;
            
            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-roles/1').reply(200, jobRole);

            const results: JobRole[] = await jobRoleService.getJobRoleById(id, '');

            expect(results).to.deep.equal(jobRole);
        });
    });
    
        it('should throw exception when 500 error returned from axios', async () => {
            const id: number = 1;

            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-roles/1').reply(500);
            let error;

            try {
                await jobRoleService.getJobRoleById(id, '');
            } catch (e) {
                error = e.message;
            }

            expect(error).to.equal('Could not get Job Role');
        });

        it('should throw exception when 404 error returned from axios', async () => {
            const id: number = 2;

            const mock = new MockAdapter(axios);

            mock.onGet(jobRoleService.API_URL + '/job-roles/2').reply(404);
            let error;

            try {
                await jobRoleService.getJobRoleById(id, '');
            } catch (e) {
                error = e.message;
            }

            expect(error).to.equal('Job Role does not exist');
        });

});

