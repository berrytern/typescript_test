import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import {Request, Response,NextFunction} from 'express';
import app from './src/app'

app(false).listen(3333,()=>{
    console.log('running api;')
})