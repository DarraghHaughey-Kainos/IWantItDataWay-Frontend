export class JobRole{

    id: number;
    jobRoleTitle: string;
    bandName: string;

    constructor(id: number, jobRoleTitle: string, bandName: string) {
        this.id = id;
        this.jobRoleTitle = jobRoleTitle;
        this.bandName = bandName;
    }
}