import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
