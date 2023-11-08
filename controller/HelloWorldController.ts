import { Application, Request, Response } from "express";
import { helloWorld } from "../model/HelloWorld";
const helloWorldService = require('../service/HelloWorldService');


module.exports = function(app: Application) {

    app.get('/', async (req:Request, res: Response) => {
        
        res.render('Home');

    })

    app.get('/hello-world', async (req: Request, res: Response) => {

        let data: helloWorld[] = [];

        try {
            data = await helloWorldService.getHelloWorld();

        } catch(e) {
            console.error(e);
        }

        res.render('HelloWorld', { helloWorld: data });
    })

}