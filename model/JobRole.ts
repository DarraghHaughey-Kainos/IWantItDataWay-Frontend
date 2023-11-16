export class JobRole{

    id: number;
    jobRoleTitle: string;
    capabilityName: string;

    constructor(id: number, jobRoleTitle: string, capabilityName: string) {
        this.id = id;
        this.jobRoleTitle = jobRoleTitle;
        this.capabilityName = this.capabilityName
    }
}