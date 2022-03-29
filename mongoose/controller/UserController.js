const express = require("express")
const { validationResult } = require("express-validator")
const User = require("../models/User")

const get_users = (req,res,next) =>{
    User.find({}, function (err,data){
      if(err)
      req.json({
        success:false,
        data: err
      })
      else
      res.json({
        success: true,
        data: data
      })
    })
  }
   
  const findOne = (req,res,next) =>{
    const name = req.params.name
      User.findOne({name:name}, function (err, data) {
        if(err)
        req.json({
          success: false,
          data : err 
        })
        else
        res.json({
          success: true,
          data: data
        })
      })
  }
  
  const create = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({
        success:false,
        errors: errors.array(
        )
      })
    }else{
      const data = req.body 
      User.create(data,function (err, data){
        if(err) 
        res.json({
          success:false,
          data: err
        })
        else
        res.json({
          success: true,
          data: data}
        )
      })
    }
  
  }
  
  const update = (req,res,next) => {
    const data = req.body
    const id = req.params.id 
    User.updateOne({_id:id}, data, function(err,data){
      if(err) 
      res.json({
        success: false,
        data: err
      })
      else
      res.json({
        success:true,
        data:data
      })
    })
  }
  
  const delete_users = (req,res,next) =>{
    User.findOneAndDelete({
      _id:req.params.id 
    }) 
    .then((data)=> res.json(data))
    .catch((err)=> res.json(err))
  }
  
  module.exports = {
    get_users,create,update,delete_users,findOne
  }