import { Application, Request, Response } from 'express';
import { JobRoles } from '../model/JobRoles';
import { JobRole } from '../model/JobRole';
import { JobRoleService } from '../service/JobRoleService';
//import { GetJobRoleByIdValidator } from '../validator/GetJobRoleByIdValidator';

const jobRoleService = new JobRoleService();
//const getJobRoleById = new GetJobRoleByIdValidator();

module.exports = function(app: Application) {
    app.get('/job-roles', async (req: Request, res: Response) => {

        let data: JobRoles[] = [];

        try {
            data = await jobRoleService.getJobRoles(req.session.token);
        } catch(e) {
            console.error(e);
        }
        res.render('job-roles', { jobRoles: data, title: 'Job Roles' });
    });

    app.get('/job-roles/:id', async (req: Request, res: Response) => {
        console.log('I am in the controller');
        let data: JobRole[] = [];

        const id: number = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.render('/job-roles', { errorMessage: 'Please enter ID as an integer'});
        }


        // if (!getJobRoleById.isValidJobRoleId(id)) {
        //     console.log('Invalid ID format! Please enter ID as an integer.');
        //     return res.render('/job-roles', { errorMessage: 'Please enter ID as an integer'});
        // }

        try {
            data = await jobRoleService.getJobRoleById(id, req.session.token);
        } catch (e) {
            console.error(e);
        }
        res.render('job-role', { jobRole: data, title: 'Job Role' });
    });
};