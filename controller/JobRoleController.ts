import { Application, Request, Response } from 'express';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';
import { Capability } from '../model/Capability';
import { CapabilityService } from '../service/CapabilityService';

const jobRoleService = new JobRoleService(); 
const capabilityService = new CapabilityService(); 


module.exports = function(app: Application) {
    app.get('/job-roles', async (req: Request, res: Response) => {

        let data: JobRole[] = [];

        try {
            data = await jobRoleService.getJobRoles();                
        } catch(e) {
            console.error(e);
        }
        res.render('job-roles', { jobRoles: data, title: 'Job Roles' });
    });

    app.get('/create-job-role', async (req: Request, res: Response) => {

        let capabilities: Capability[] = [];

        try {
            capabilities = await capabilityService.getAllCapabilities();                
        } catch(e) {
            console.error(e);
        }
        res.render('create-job-role', {capabilities, title: 'Create Job Role' });
    });

    app.post('/create-job-role', async (req:Request, res:Response) => {

        

    });
};