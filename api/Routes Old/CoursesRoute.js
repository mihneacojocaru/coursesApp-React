const express = require('express');
//const CoursesRepository = require('../Repository/CoursesRepository.js');
const coursesRoute = express.Router();
const courseRepo = new CoursesRepository();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

coursesRoute.get('/', asyncHandler(async(req,res,next)=>{
    let items = await courseRepo.getCourses();
    res.status(200).json(items);
}));

coursesRoute.post('/', asyncHandler(async(req,res,next)=>{
    let item = req.body;
    courseRepo.newCourseList(item);
    res.status(200).json("New course sucessfuly added");
}));

coursesRoute.put('/put', asyncHandler(async(req,res,next)=>{
    let item = req.body;
    let test = await courseRepo.verifyItem(item.course_id);
    if(test == true){
        courseRepo.updateCourses(item);
    res.status(200).json("You've been succesfully enroled");
    }else{
        req.id = item.course_id;
        next();
    }
}));

coursesRoute.delete('/:courseId', asyncHandler(async(req,res,next)=>{
    let {courseId} = req.params; 
    //--> Same as: let id = req.params.courseId;
    let test = await courseRepo.verifyItem(courseId);
    if(test == true){
        courseRepo.deleteCourse(courseId);
        res.status(200).json('Deleted successfuly');
    }else{
        req.id = courseId;
        next();
    }
}));

coursesRoute.use((req,res,next) => {
    let errMsg = `Course with id #${req.id} wasn't found.`;
    next(errMsg);
});

module.exports = coursesRoute;