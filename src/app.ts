import express from 'express';
import database from './config/database';
import middlewares from './config/middleware'
import routes from './routes'

const app=express();
app.use(middlewares)
app.use('/',routes)
export default app