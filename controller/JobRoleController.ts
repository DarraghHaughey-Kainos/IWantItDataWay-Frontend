import { Application, Request, Response } from 'express';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';

const jobRoleService = new JobRoleService();


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

};