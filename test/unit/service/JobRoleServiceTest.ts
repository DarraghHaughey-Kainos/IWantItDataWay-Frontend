import { JobRoles } from '../../../model/JobRoles';
import { JobRole } from '../../../model/JobRole';
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
    });

    /*
    expect throw expception with a message when a 500 error is returned from axios
    */

    it('should throw expception when 500 error returned from axios', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(jobRoleService.API_URL + '/job-roles').reply(500);
        let error;

        try{
            await jobRoleService.getJobRoles('');
        }catch (e){
             error = e.message;
        }

        expect(error).to.equal('Could not get Job Roles');
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


describe('createJobRole', function () {
    it('should return response 202 when able to delete job role.', async () => {
        const id: string = '1';
        const fakeResponse = {
            message: 'Job Role with ' + id + ' has been removed!',
            status: 202,
        };

        const headers = { 'Authorization': '' };


        const mock = new MockAdapter(axios);

        mock.onDelete(jobRoleService.API_URL + '/job-roles/' + id, { headers }).reply(202, fakeResponse);

        const results: any = await jobRoleService.deleteJobRoleById('', id);

        expect(results.message).to.deep.equal(fakeResponse.message);
        expect(results.status).to.deep.equal(fakeResponse.status);
    });

    it('should return response 500 when server error occurs.', async () => {
        const id: string = '1';
        let error: string;

        const headers = { 'Authorization': '' };
        const mock = new MockAdapter(axios);
        mock.onDelete(jobRoleService.API_URL + '/job-roles/' + id, { headers }).reply(500);

        try {
            await jobRoleService.deleteJobRoleById('', id);
        } catch (e) {
            error = e.message;
        }

        expect(error).to.deep.equal('Could Not Get Job Roles');
    });

    it('should return response 403 when user is unauthorised to perform action.', async () => {
        const id: string = '1';
        let error: string;

        const headers = { 'Authorization': '' };
        const mock = new MockAdapter(axios);
        mock.onDelete(jobRoleService.API_URL + '/job-roles/' + id, { headers }).reply(403);

        try {
            await jobRoleService.deleteJobRoleById('', id);
        } catch (e) {
            error = e.message;
        }

        expect(error).to.deep.equal('You Do Not Have The Correct Permissions');
    });

    it('should return response 404 when job role id does not exist.', async () => {
        const id: string = '-1';
        let error: string;

        const headers = { 'Authorization': '' };
        const mock = new MockAdapter(axios);
        mock.onDelete(jobRoleService.API_URL + '/job-roles/' + id, { headers }).reply(404);

        try {
            await jobRoleService.deleteJobRoleById('', id);
        } catch (e) {
            error = e.message;
        }

        expect(error).to.deep.equal('Could Not Find Job Roles With ID: -1');
    });
});
