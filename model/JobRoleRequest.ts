export class JobRoleRequest{

    jobRoleTitle: string;
    capabilityId: number;
    bandId: number;
    sharePointLink: string;

    constructor(jobRoleTitle: string, capabilityId: number, bandId: number, sharePointLink: string) {

        this.jobRoleTitle = jobRoleTitle;
        this.capabilityId = capabilityId;
        this.bandId = bandId;
        this.sharePointLink = sharePointLink;
        
    }
}