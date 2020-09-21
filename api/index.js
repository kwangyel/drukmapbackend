//const express=require('express');
//const bodyparser=require('body-parser');

import express from 'express';
import bodyparser from 'body-parser';
import config from 'dotenv';
import cors from 'cors';
import mapRoutes from './server/routes/mapRoutes'

config.config();

const app=express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const port = process.env.PORT || 8080;

app.get('/',(req,res)=>{
	res.status(200).send({
		message:'welcome to the Bhutan Plans API.'
	})
});
app.use('/map',mapRoutes)

app.listen(port,()=>{
	console.log(`server listening on port ${port}`)
});

//module.exports=app;

export default app;
