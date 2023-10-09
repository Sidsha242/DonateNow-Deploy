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

module.exports = {addMedInfo};