const express = require('express');
const {sequelize, Users} = require('../models');
const UsersRoute = express.Router();



module.exports = UsersRoute;

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

//--- Authentification

UsersRoute.post('/newUser', asyncHandler(async(req,res,next)=>{
    const u = req.body;
    const newUser = await Users.create(u);
    return res.status(200).json(newUser);
}));

UsersRoute.post('/authentificate', asyncHandler(async(req,res,next)=>{
    const u = req.body;
    const checkUser = await Users.findOne({
        where:{
            username:u.username,
            password:u.password
        }
    })
    if(checkUser == null){
        return res.status(404).json('[]');
    }else{
        return res.status(200).json(checkUser);
    }

}))