import { Application, Request, Response } from 'express';
import { Login } from '../model/Login';
import { AuthService } from '../service/AuthService';

const authService = new AuthService();

module.exports = function(app: Application) {

    app.get('/login', async (req: Request, res: Response) => {
        res.render('login', {title: 'Login'});
    });

    app.post('/login', async (req: Request, res: Response) => {
        const data: Login = req.body;

        try {
            req.session.token = await authService.login(data);

            res.redirect('/');
        } catch(e) {
            console.log(e.message);
            res.locals.errormessage = e.message.message;
            req.body.password = '';
            res.render('login', req.body);
        }
    });

    app.get('/register', async (req: Request, res: Response) => {
        res.render('register', {title: 'Register'});
    });


    app.post('/register', async (req: Request, res: Response) => {
        const data: Login = req.body;

        try {
            req.session.token = await authService.register(data);

            res.redirect('/');
        } catch(e) {
            res.locals.errormessage = e.message;
            req.body.password = '';
            res.render('register', req.body);
        }
    });

    app.get('/logout', async (req: Request, res: Response) => {
        req.session.token = '';

        res.redirect('/');
    });
};