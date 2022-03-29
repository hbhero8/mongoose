const express = require("express")
const { validationResult } = require("express-validator")
const Order = require("../models/Order")

const get_orders = (req,res,next) =>{
  Order.find({}, function (err,data){
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
  const id = req.params.id
    Order.findOne({name:name,id:id}, function (err, data) {
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
    Order.create(data,function (err, data){
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
  Order.updateOne({_id:id}, data, function(err,data){
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

const delete_orders = (req,res,next) =>{
  Order.findOneAndDelete({
    _id:req.params.id 
  }) 
  .then((data)=> res.json(data))
  .catch((err)=> res.json(err))
}

module.exports = {
  get_orders,create,update,delete_orders,findOne
}