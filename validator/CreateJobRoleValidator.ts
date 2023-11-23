import { JobRoleRequest } from '../model/JobRoleRequest';

export class CreateJobRoleValidator {

    validateJobRole(jobRoleRequest: JobRoleRequest): string {

        if (jobRoleRequest.jobRoleTitle.length <= 0) {
            return 'Job Role Title Field must not be empty';
        }

        if(jobRoleRequest.jobRoleTitle.length > 100){
            return 'The job role title must be less than 100 characters';
        }

        if (jobRoleRequest.capabilityId == null) {
            return 'Must select a Capability';
        }

        if (jobRoleRequest.bandId == null) {
            return 'Must select a Band';
        }

        if(jobRoleRequest.sharePointLink.length < 15){
            return 'Sharepoint Link must be at least 15 characters to be a valid link';
        }

        return null;

    }
}