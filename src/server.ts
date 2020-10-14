import express from 'express';
import {Request, Response,NextFunction} from 'express';
import app from './app'



app.listen(3333,()=>{
    console.log('running api;')
})