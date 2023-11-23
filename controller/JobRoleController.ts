import { Application, Request, Response } from 'express';
import { JobRoles } from '../model/JobRoles';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';

const jobRoleService = new JobRoleService();

module.exports = function(app: Application) {
    app.get('/job-roles', async (req: Request, res: Response) => {

        let data: JobRoles[] = [];

        try {
            data = await jobRoleService.getJobRoles(req.session.token);
        } catch(e) {
            console.error(e);
        }
        res.render('job-roles', { jobRoles: data, title: 'Job Roles', errorMessage: req.session.error  });
    });

    app.get('/job-roles/:id', async (req: Request, res: Response) => {
        
        let data: JobRole[] = [];

        const id: number = Number(req.params.id);

        try {
            data = await jobRoleService.getJobRoleById(id, req.session.token);

        } catch (e) {
            console.error(e);
        }
        res.render('job-role', { jobRole: data, title: 'Job Role', isAdmin: req.session.isAdmin });
    });

    app.post('/job-roles/delete/:id',async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        let data: JobRole[];

        try {
            data = await jobRoleService.getJobRoleById(id, req.session.token);
            await jobRoleService.deleteJobRoleById(req.session.token, id);
            res.redirect('/job-roles');
        } catch(e) {
            res.render('job-roles/' + id, { jobRoles: data, title: 'Job Role', errorMessage: e.message });
        }
    });
};