import { Application, Request, Response } from 'express';


module.exports = function(app: Application) {

    app.get('/', async (req: Request, res: Response) => {

        res.render('index', {title: 'Home'});
    });

    app.get('/error', async (req: Request, res: Response) => {

        res.render('index', {title: 'Home', errorMessage: req.session.error});
    });

};