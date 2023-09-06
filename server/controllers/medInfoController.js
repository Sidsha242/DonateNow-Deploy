const MedInfo = require ("../models/medInfoModel");

const addMedInfo = async (req, res) => {
    var newMedInfo = new MedInfo({
      user_id: req.body.user_id,
      email: req.body.email,
      bldgrp : req.body.bldgrp,
      age : req.body.age,
  
    });
    try{
      await newMedInfo.save()
      res.json({ result: newMedInfo, message: "Information Added Successfuly" });
    }catch(err)
    {
      console.log(err);
      res.json({ result: err, message: "Error" });
    }
}

const getMedInfo = async (req, res) => {
    console.log('Inside getinfo');
    const id = req.params.id;
  
    try {
      const info = await MedInfo.findOne({
        _id: req.params.id,
      });
      if (info) {
        res.status(200).json({
          status: 200,
          data: info,
        });
      }
      res.status(400).json({
        status: 400,
        message: "No user info found",
      });
    } 
    catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
}

module.exports = {addMedInfo,getMedInfo};