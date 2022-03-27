const express = require('express');
const {sequelize} = require('../models');
const { QueryTypes } = require('sequelize');

const {Courses, CourseDetails} = require('../models');

const coursesRoute = express.Router();

module.exports = coursesRoute;

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

//--- COURSES
coursesRoute.get('/courses', asyncHandler(async (req,res,next)=>{
    const d = await Courses.findAll();
    return res.status(200).json(d);
}));

coursesRoute.get('/course/:id', asyncHandler(async (req,res,next)=>{
    const {id} = req.params;
    console.log(id);
    const d = await Courses.findByPk(id);
    return res.status(200).json(d);
}));

coursesRoute.post('/addCourse', asyncHandler(async (req,res,next)=>{
    const {course_name,department} = req.body;
    const postCourse = await Courses.create({course_name,department});
    return res.status(201).json(postCourse);
}));

coursesRoute.delete('/delCourse/:id', asyncHandler(async(req,res,next)=>{
    let {id} = req.params;
    let course = await Courses.findByPk(id);
    await course.destroy();
    return res.status(202).json(`Course ${course.course_name} was deleted succesfully.`);
}));

coursesRoute.put('/updateCourse/:id', asyncHandler(async(req,res,next)=>{
    let item = req.body;
    let {id} = req.params;
    let d = await Courses.findByPk(id);

    console.log(item);

    if(item.course_name != '') d.course_name = item.course_name;
    if(item.department != '') d.department = item.department;
    if(item.updatedAt != '') d.updatedAt = item.updatedAt;
    
    d.save();
    res.status(200).json(d);
}));
//--- COURSE DETAILS

coursesRoute.get('/getCourseDetails/:id', asyncHandler(async(req,res,next)=>{
    let {id} = req.params;
    let d = await CourseDetails.findAll({
        where: {
            course_id: id
        }
    });
    d = d[0];
    return res.status(200).json(d);
}));

coursesRoute.post('/addCourseDetails', asyncHandler(async(req,res,next)=>{
    const {title,professor,description,estimated_time,materials_needed,course_id} = req.body;
    const postDetails = await CourseDetails.create({title,professor,description,estimated_time,materials_needed,course_id});
    return res.status(201).json(postDetails);
}));

coursesRoute.put('/updateCourseDetails/:id', asyncHandler(async(req,res,next)=>{
    let {id} = req.params;
    let item = req.body;
    let details = await CourseDetails.findAll({
        where:{
            course_id: id
        }
    });

    let detailsId = details[0].id
    
    let d = await CourseDetails.findByPk(detailsId);

    console.log(d);

    if(item.professor != '') d.professor = item.professor;
    if(item.title != '') d.title = item.title;
    if(item.description != '') d.description = item.description;
    if(item.estimated_time != '') d.estimated_time = item.estimated_time;
    if(item.materials_needed != '') d.materials_needed = item.materials_needed;

    d.save();
    res.status(200).send(d);

}));    

//--- Create new course

coursesRoute.post('/newCourse', asyncHandler(async(req,res,next)=>{

    const {course_name,department} = req.body;
    const {title,professor,description,estimated_time,materials_needed} = req.body;
    const newCourse = await Courses.create({course_name,department});
    const course_id = newCourse.id;
    const newDetails = await CourseDetails.create({title,professor,description,estimated_time,materials_needed,course_id});

    return res.status(201).json([newCourse,newDetails]);
}));