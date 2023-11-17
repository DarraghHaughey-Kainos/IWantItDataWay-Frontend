const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
import { Request, Response, NextFunction } from 'express';
import session = require('express-session');

const app = express();
const authMiddleware = require('./middleware/auth');

//configure Nunjucks
const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.EXPRESS_SECRET, 
    cookie: {maxAge: 600000}
}));

declare module 'express-session'{
    interface SessionData{
        token: string;
   }
}

app.listen(3000, () => { 
    console.log('Server listening on port 3000');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.session.token !== undefined && req.session.token.length > 0) {
        res.locals.sessionValid = true;
    } else {
        res.locals.sessionValid = false;
    }
    next();
});

require('./controller/HomeController')(app);
require('./controller/AuthController')(app);

app.use(authMiddleware);
require('./controller/HelloWorldController')(app);
require('./controller/JobRoleController')(app);

