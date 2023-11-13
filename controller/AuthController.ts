import { Application, Request, Response } from "express";
import { Login } from "../model/Login";
import { AuthService } from "../service/AuthService";

const authService = new AuthService();

module.exports = function(app: Application) {

    app.get('/login', async (req: Request, res: Response) => {
        res.render('Login', {title: "Login"});
    })

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body;

        try {
            req.session.token = await authService.login(data)

            res.redirect("/");
        } catch(e) {
            res.locals.errormessage = e.message;

            res.render("login", req.body)
        }
    })

    app.get('/register', async (req: Request, res: Response) => {
        
        res.render('Register', {title: "Register"});
    })


    app.post('/register', async (req: Request, res: Response) => {
        let data: Login = req.body;

        try {
            req.session.token = await authService.register(data)

            res.redirect("/");
        } catch(e) {
            res.locals.errormessage = e.message;

            res.render("login", req.body)
        }
    })

    app.get('/logout', async (req: Request, res: Response) => {
        req.session.token = ""

        res.redirect("/");
    })
}