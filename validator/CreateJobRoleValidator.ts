import { JobRoleRequest } from '../model/JobRoleRequest';

export class CreateJobRoleValidator {

    validateJobRole(jobRoleRequest: JobRoleRequest): string {

        if (jobRoleRequest.jobRoleTitle.length <= 0) {
            return 'Job Role Title Field must not be empty';
        }

        if (jobRoleRequest.capabilityId == null) {
            return 'Must select a Capability';
        }

        if (jobRoleRequest.bandId == null) {
            return 'Must select a Band';
        }

        return null;

    }
}