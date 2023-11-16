import { Application, Request, Response } from 'express';
import { helloWorld } from '../model/HelloWorld';
import { HelloWorldService } from '../service/HelloWorldService';

const helloWorldService = new HelloWorldService();

module.exports = function(app: Application) {

    app.get('/hello-world', async (req: Request, res: Response) => {

        let data: helloWorld[] = [];

        try {
            data = await helloWorldService.getHelloWorld(req.session.token);

        } catch(e) {
            console.error(e);
        }

        res.render('hello-world', { helloWorld: data, title: 'Hello World' });
    });
};