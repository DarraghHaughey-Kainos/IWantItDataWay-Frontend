import { Application, Request, Response } from 'express';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';
import { Capability } from '../model/Capability';
import { CapabilityService } from '../service/CapabilityService';
import { Band } from '../model/Band';
import { BandService } from '../service/BandService';

const jobRoleService = new JobRoleService();
const capabilityService = new CapabilityService();
const bandService = new BandService();

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

    app.get('/job-role', async (req: Request, res: Response) => {

        let capability: Capability[] = [];
        let band: Band[] = [];

        try {
            capability = await capabilityService.getAllCapabilities();
        } catch(e) {
            console.error(e);
        }

        try {
            band = await bandService.getAllBands();
        } catch(e) {
            console.error(e);
        }

        res.render('create-job-role', {capabilities: capability, bands: band, title: 'Create Job Role'})

    });

    app.post('/job-role', async (req:Request, res: Response) => {
        
    });
};