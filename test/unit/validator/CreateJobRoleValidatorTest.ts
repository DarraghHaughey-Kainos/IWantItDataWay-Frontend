import { JobRoleRequest } from '../../../model/JobRoleRequest';
import { CreateJobRoleValidator } from '../../../validator/CreateJobRoleValidator';

const chai = require('chai');
const expect = chai.expect;


describe('CreateJobRoleValidator', function () {

    const createJobRoleValidator: CreateJobRoleValidator = new CreateJobRoleValidator();

    describe('validateJobRole', function () {

        it('should return null when no errors', () => {

            const jobRoleRequest: JobRoleRequest = new JobRoleRequest('Engineer', 1, 1, 'link.sharepoint.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest)).to.be.null;


        });

        it('should return error message when job role title field is empty', () => {

            const jobRoleRequest: JobRoleRequest = new JobRoleRequest('', 1, 1, 'link.sharepoint.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest)).to.equal('Job Role Title Field must not be empty');

        });

        it('should return error message when job role title field contains 100 or more characters', () => {

            const title: string = 'engineer';
            const jobRoleRequest: JobRoleRequest = new JobRoleRequest(title.repeat(50), 1, 1, 'link.sharepoint.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest)).to.equal('The job role title must be less than 100 characters');

        });

        it('should return error message when capability field is null', () => {

            const jobRoleRequest: JobRoleRequest = new JobRoleRequest('Engineer', null, 1, 'link.sharepoint.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest)).to.equal('Must select a Capability');

        });

        it('should return error message when band field is null', () => {

            const jobRoleRequest: JobRoleRequest = new JobRoleRequest('Engineer', 1, null, 'link.sharepoint.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest)).to.equal('Must select a Band');

        });

        it('should return error message when sharepoint link is less than 15 chars', () => {

            const jobRoleRequest: JobRoleRequest = new JobRoleRequest('Engineer', 1, 1, 'link.com');

            expect(createJobRoleValidator.validateJobRole(jobRoleRequest))
                .to.equal('Sharepoint Link must be at least 15 characters to be a valid link');

        });

    });

});