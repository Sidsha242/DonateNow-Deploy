const MedInfo = require ("../models/medInfoModel");

const addMedInfo = async (req, res) => {
    var newMedInfo = new MedInfo({
      donor_id: req.body.donor_id,
      bldgrp : req.body.bldgrp,
      age : req.body.age,
      sex : req.body.sex,
    });
    try{
      await newMedInfo.save()
      res.json({ result: newMedInfo, message: "Information Added Successfuly" });
    }catch(err)
    {
      console.log(err);
      res.json({ result: err, message: "Error adding medinfo" });
    }
    // try {  
    //   // Check if the required fields are provided
    //   if (!donor_id || !bldgrp || !age || !sex) {
    //     return res.status(400).json({ message: 'Please provide all required fields' });
    //   }
  
    //   // Create a new medical information record
    //   const newMedInfo = new MedInfo({
    //     donor_id: req.body.donor_id,
    //     bldgrp : req.body.bldgrp,
    //     age : req.body.age,
    //     sex : req.body.sex,
    //   });
  
    //   // Save the record to the database
    //   await newMedInfo.save();
  
    //   res.status(201).json({ result: newMedInfo, message: 'MedInfo Added Successfully' });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ result: err, message: 'Error adding medinfo' });
    // }
}

module.exports = {addMedInfo};