export class JobRole {

    jobRoleId: number;
    jobRoleTitle: string;
    capabilityName: string;
    sharepointLink: string;
    specificationText: string;

    constructor(jobRoleId: number, jobRoleTitle: string, capabilityName: string, specificationText: string, sharepointLink: string) {
        this.jobRoleId = jobRoleId;
        this.jobRoleTitle = jobRoleTitle;
        this.capabilityName = capabilityName;
        this.sharepointLink = sharepointLink;
        this.specificationText = specificationText;
    }
}