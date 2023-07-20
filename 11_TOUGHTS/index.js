import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import flash from 'express-flash';
import conn from './db/conn.js';
import path from 'path';
import os from 'os';

const app = express();
const FileStore = sessionFileStore(session);

//Models
import Tought from './models/Tought.js';
import User from './models/User.js';

//Import routes
import toughtsRoutes from './routes/toughtsRoutes.js';
import authRoutes from './routes/authRoutes.js'
//Import controllers
import ToughtController from './controllers/ToughtController.js';
import AuthController from './controllers/AuthController.js';

//receber resposta do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
//session middleware
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () { },
        path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    },
}),
);

//flash messages
app.use(flash());

//public path
app.use(express.static('public'));

//set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

//routes
app.use('/toughts', toughtsRoutes);
app.use('/', authRoutes);


app.get('/', ToughtController.showToughts);


conn
    //.sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000)
    }).catch((err) => {
        console.log(err);
    });