import express from 'express';

import EnrolmentRepository from '../Repository/EnrolmentRepository.js';

const enrolmentRoute = express.Router();

const enrolmentRepo = new EnrolmentRepository();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
};

enrolmentRoute.get("/", asyncHandler(async (req,res,next) =>{
    let items = await enrolmentRepo.getEnrolment();
    res.status(200).json(items);
}));

enrolmentRoute.post('/', asyncHandler(async (req,res,next)=>{
    let item = req.body;
    enrolmentRepo.newEnrolmentsList(item);
    res.status(200).json("You've been succesfully enroled");
}));

enrolmentRoute.put('/:studentId/:courseId', asyncHandler( async (req,res,next) =>{
    let test = await enrolmentRepo.verifyItem(req.params.studentId, req.params.courseId);
    if(test == true){
        enrolmentRepo.updateEnrolmentsList(req.body,req.params.studentId,req.params.courseId);
        res.status(200).json("Enrollment updated succesfuly");
    }else{
        req.allIds = {
            "stId": req.params.studentId,
            "cId": req.params.courseId
        }
        next();
    }
}));

enrolmentRoute.delete('/:studentId/:courseId', asyncHandler( async (req,res,next) => {
    let test = await enrolmentRepo.verifyItem(req.params.studentId, req.params.courseId);
    if(test == true){
        enrolmentRepo.deleteEnrolment(req.params.studentId,req.params.courseId);
        res.status(200).json('Deleted successfuly');
    }else{
        req.allIds = {
            "stId": req.params.studentId,
            "cId": req.params.courseId
        }
        next();
    }
}));

enrolmentRoute.use((req,res,next)=>{
    let errMsg = `Enrolment with the student id #${req.allIds.stId} for course ${req.allIds.cId} wasn't found.`;
    next(errMsg);
});



export default enrolmentRoute;