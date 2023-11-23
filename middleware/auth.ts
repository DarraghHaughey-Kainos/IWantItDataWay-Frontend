import { NextFunction, Request, Response } from 'express';

const noPermissionEndpointList = ['/', '/login', '/register'];
const viewEndpointList = ['/job-roles'];
const adminEndpointList = ['/hello-world', '/job-roles/create'];

module.exports = function (req: Request, res: Response, next: NextFunction) {

    let routeSecureCheck = false;
    req.session.error = undefined;

    if (!noPermissionEndpointList.includes(req.url)) {
        if (req.session.token == undefined) {
            res.redirect('/login');
        } else {
            routeSecureCheck = true;
        }
    }

    // Check Endpoint Permissions
    if (routeSecureCheck) {
        const token: string = req.session.token;

        const base64String = token.split('.')[1];
        const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
        const userRole: string = decodedValue['role'];

        if (viewEndpointList.includes(req.url)) {
            // View Permission Required.

            // Check Permission on token
            if (['View', 'Admin'].includes(userRole)) {
                next();
            } else {
                // Does Not Have Permission
                req.session.error = 'Page Requires View or Admin Permissions';
                res.redirect('/error');
            }
        } else if (adminEndpointList.includes(req.url)) {
            // Admin Permission Required.

            // Check Permission on token
            if (['Admin'].includes(userRole)) {
                next();
            } else {
                // Does Not Have Permission
                req.session.error = 'Page Requires Admin Permissions';
                res.redirect('/error');
            }
        }
    }
};
