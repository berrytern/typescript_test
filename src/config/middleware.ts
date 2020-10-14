import express from 'express';
import bodyparser from 'body-parser';
const app=express();

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
export default app