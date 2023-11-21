import { NextFunction, Request, Response } from 'express';


module.exports = function (req: Request, res: Response, next: NextFunction) {
    if (res.locals.sessionValid) {
        next();
    } else {
        res.redirect('/login');
    }
};