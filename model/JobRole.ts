export class JobRole{

    id: number;
    jobRoleTitle: string;
    capabilityName: string;
    bandName: string;

    constructor(id: number, jobRoleTitle: string, capabilityName: string, bandName: string) {
        this.id = id;
        this.jobRoleTitle = jobRoleTitle;
        this.capabilityName = this.capabilityName
        this.bandName = bandName;
        
    }
}