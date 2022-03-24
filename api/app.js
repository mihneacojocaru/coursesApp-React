import express, { application } from 'express';

import StudentsRoute from "./Routes/StudentsRoute.js"
import EnrolmentRoute from './Routes/EnrolmentRoute.js';
import CoursesRoute from './Routes/CoursesRoute.js';

import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//routes
app.use('/api/v1/students',StudentsRoute);
app.use('/api/v1/enrolments',EnrolmentRoute);
app.use('/api/v1/courses',CoursesRoute);

app.use((errMsg,req,res,next)=>{
    const err = new Error(errMsg);
    err.status = 404;
    next(err);
});

app.use((errMsg,req,res,next)=>{
    res.status(errMsg.status || 500);
    res.json({
        error:{
            message:errMsg.message
        }
    });
});

app.listen(port, ()=>console.log("Listenting on port " + port));