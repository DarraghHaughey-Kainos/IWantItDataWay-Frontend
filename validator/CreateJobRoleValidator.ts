import { JobRoleRequest } from "../model/JobRoleRequest";

export function validateJobRole(jobRoleRequest: JobRoleRequest): string {

    if(jobRoleRequest.jobRoleTitle.length <= 0){
        return "Job Role Title Field must not be empty";
    }

    if(jobRoleRequest.capabilityName == null){
        return "Must select a Capability";
    }

    if(jobRoleRequest.bandName == null){
        return "Must select a Band";
    }

    return null;

}