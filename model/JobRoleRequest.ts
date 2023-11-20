export class JobRoleRequest{

    jobRoleTitle: string;
    capabilityName: string;
    bandName: string;
    sharePointLink: string;

    constructor(jobRoleTitle: string, capabilityName: string, bandName: string, sharePointLink: string) {

        this.jobRoleTitle = jobRoleTitle;
        this.capabilityName = capabilityName;
        this.bandName = bandName;
        this.sharePointLink = sharePointLink;
        
    }
}