import { Application, Request, Response } from 'express';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';
import { Capability } from '../model/Capability';
import { CapabilityService } from '../service/CapabilityService';
import { Band } from '../model/Band';
import { BandService } from '../service/BandService';
import { JobRoleRequest } from '../model/JobRoleRequest';

const jobRoleService = new JobRoleService();
const capabilityService = new CapabilityService();
const bandService = new BandService();

module.exports = function(app: Application) {
    app.get('/job-roles', async (req: Request, res: Response) => {

        let data: JobRole[] = [];

        try {
            data = await jobRoleService.getJobRoles(req.session.token);
        } catch(e) {
            console.error(e);
        }
        res.render('job-roles', { jobRoles: data, title: 'Job Roles' });
    });

    app.get('/job-roles/create', async (req: Request, res: Response) => {

        let capability: Capability[] = [];
        let band: Band[] = [];

        try {
            capability = await capabilityService.getAllCapabilities(req.session.token);
            band = await bandService.getAllBands(req.session.token);
        } catch (e) {
            console.error(e);
        }

        res.render('create-job-role', { capabilities: capability, bands: band, title: 'Create Job Role', userData: req.session.userData });

    });

    app.post('/job-roles/create', async (req: Request, res: Response) => {

        const data: JobRoleRequest = req.body;
        let capability: Capability[] = [];
        let band: Band[] = [];
        req.session.userData = data;

        try {
            capability = await capabilityService.getAllCapabilities(req.session.token);
            band = await bandService.getAllBands(req.session.token);
            await jobRoleService.createJobRole(data);
            req.session.userData = undefined;
            res.redirect('/job-roles');
        } catch (e) {

            console.error(e);
            res.locals.errormessage = e.message;
            res.render('create-job-role', { capabilities: capability, bands: band, title: 'Create Job Role', userData: req.session.userData });

        }

    });
};