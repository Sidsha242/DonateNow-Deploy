const User = require("../models/userModel");
const MedInfo = require ("../models/medInfoModel");
const mongoose = require("mongoose");
const DonationHistory = require('../models/donationHistoryModel');
const db = mongoose.connection;

const getAllUsersEntirely = async (req, res) => {
  try {
    const usersWithMedInfo = await User.aggregate([
      {
        $lookup: {
          from: "medinfos", // The name of the MedInfo collection
          localField: "donor_id", // Field from the User collection
          foreignField: "donor_id", // Field from the MedInfo collection
          as: "medinfo", // Alias for the joined data
        },
      },
    ]);

    res.json(usersWithMedInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user data with MedInfo.' });
  }
};

const adminInfo = async(req, res) => {
  const result = await db.collection('users').aggregate([
    {
      $lookup: {
        from: 'medinfos',
        localField: 'email',
        foreignField: 'email',
        as: 'usersdetails'
      }
    }
  ]).toArray()
  const bloodGroupMap = new Map(
  );
  bloodGroupMap.set('A+', 0)
  bloodGroupMap.set('A-', 0)
  bloodGroupMap.set('B+', 0)
  bloodGroupMap.set('B-', 0)
  bloodGroupMap.set('AB+', 0)
  bloodGroupMap.set('AB-', 0)

  result.forEach(entry => {
    bloodGroupMap.set(entry?.usersdetails[0]?.bldgrp,bloodGroupMap.get(entry?.usersdetails[0]?.bldgrp) + 1)
  })

  const jsonObject = {};
  for (let [key, value] of bloodGroupMap) {
    const bld = `${key}`;
    const num = parseInt(`${value}`);
    jsonObject[bld] = num;
  }
 
  let op = Object.entries(jsonObject)
         .map(([ label, value ] ) => ({ label, value }))
  console.log(op)
  res.json({result : result, piedata: op});
}

const sendMsg = async (req,res) => {
  const BloodGroup = req.body.bldgrp;
  const txtMsg = req.body.smsText;
  try {
    // const fourMonthsAgo = new Date();
    // fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    const usersWithBloodGroup = await MedInfo.find({ bldgrp: { $in: BloodGroup } });

    // Collect their phone numbers
    const phoneNum_arr = usersWithBloodGroup.map(user => user.donor_id);

    // Now you have an array of donor_ids, you need to fetch their phone numbers from the User model
    const phoneNumbers = await User.find({ donor_id: { $in: phoneNum_arr } }, "phonenum");

    // Extract phone numbers from the result
    const phoneNumbersArr = phoneNumbers.map(user => user.phonenum);
    console.log(phoneNumbersArr)
    // for (let k = 0; k < phoneNumbersArr.length; k++) {
    //   client.messages.create({
    //     to: '+' + phoneNumbersArr[k],
    //     from: '+19382536013',
    //     body: txtMsg,
    //   })
    //   .then((message) => console.log('Message sent to', phoneNumbersArr[k]));
    // }

    res.status(200).json({ message: 'Messages sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending messages' });
  }
}



const addDonationHistory = async (req, res) => {
  try {
    const { donor_id, request_id, bldGrpDonated, amount_Donated } = req.body;
    //no need for date of donation

    const newDonation = new DonationHistory({
      donor_id,
      request_id,
      bldGrpDonated,
      amount_Donated,
    });

    await newDonation.save();

    const medinfo = await MedInfo.findOne({ donor_id });
    
    if (medinfo) {
      medinfo.totalAmountDonated += amount_Donated;
      medinfo.lastDonationDate =newDonation.dateOfDonation;
      await medinfo.save();
    } else {
      console.error("MedInfo document not found for donor_id:", donor_id);
    }

    res.status(201).json({result: newDonation, message: 'Donation history entry added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the donation history entry' });
  }
};

module.exports = {getAllUsersEntirely, adminInfo, sendMsg, addDonationHistory};