require("dotenv").config();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const DonationHistory = require("../models/donationHistoryModel");
const Request = require("../models/requestModel");
//const InterestedDonor = require("../models/interestedDonorModel");

const db = mongoose.connection;

const getAllUsersEntirely = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching all User data",
    });
  }
};

const adminInfo = async (req, res) => {
  const result = await User.find();

  const bloodGroupMap = new Map();
  bloodGroupMap.set("A+", 0);
  bloodGroupMap.set("A-", 0);
  bloodGroupMap.set("B+", 0);
  bloodGroupMap.set("B-", 0);
  bloodGroupMap.set("AB+", 0);
  bloodGroupMap.set("AB-", 0);
  bloodGroupMap.set("O+", 0);
  bloodGroupMap.set("O-", 0);

  result.forEach((entry) => {
    bloodGroupMap.set(entry?.bldgrp, bloodGroupMap.get(entry?.bldgrp) + 1);
  });

  const jsonObject = {};
  for (let [key, value] of bloodGroupMap) {
    const bld = `${key}`;
    const num = parseInt(`${value}`);
    jsonObject[bld] = num;
  }

  const palette = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF0000",
    "#800080",
    "#0000FF",
    "#008000",
  ];
  let paletteCopy = [...palette];
  function getRandomNonRepeating() {
    if (paletteCopy.length === 0) {
      paletteCopy = [...palette]; // reset the copy if all elements have been used
    }
    const randomIndex = Math.floor(Math.random() * paletteCopy.length);
    const selectedElement = paletteCopy.splice(randomIndex, 1);
    return selectedElement[0];
  }

  let op = Object.entries(jsonObject).map(([label, value, i]) => ({
    label,
    value,
    color: getRandomNonRepeating(),
  }));
  res.json({ result: result, piedata: op });
};

const requestInfo = async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json(allRequests);
  } catch (error) {
    console.error("Error in /request-info route:", error);
    res.status(500).send("Internal Server Error");
  }
};

// const sendMsg = async (req, res) => {
//   const BloodGroup = req.body.bldgrp;
//   const txtMsg = req.body.smsText;
//   try {
//     // const fourMonthsAgo = new Date();
//     // fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

//     console.log(BloodGroup);
//     console.log(txtMsg);
//     const usersWithBloodGroup = await MedInfo.find({
//       bldgrp: { $in: BloodGroup },
//     });
//     console.log(usersWithBloodGroup);

//     const phoneNum_arr = usersWithBloodGroup.map((user) => user.donor_id);

//     const phoneNumbers = await User.find(
//       { donor_id: { $in: phoneNum_arr } },
//       "phonenum"
//     );

//     const phoneNumbersArr = phoneNumbers.map((user) => user.phonenum);
//     //console.log(phoneNumbersArr);
//     // for (let k = 0; k < phoneNumbersArr.length; k++) {
//     //   client.messages
//     //     .create({
//     //       to: "+" + phoneNumbersArr[k],
//     //       from: process.env.TWILIO_PHONE_NUM,
//     //       body: txtMsg,
//     //     })
//     //     .then((message) => console.log("Message sent to", phoneNumbersArr[k]));
//     // }

//     res.status(200).json({ message: "Messages sent successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "An error occurred while sending messages" });
//   }
// };

const addDonationHistory = async (req, res) => {
  try {
    const { donor_id, request_id, amount_Donated } = req.body;

    // const interestedDonorEntry = await InterestedDonor.findOne({
    //   request_id,
    //   donor_id,
    // });

    // if (interestedDonorEntry) {
    //   await InterestedDonor.deleteOne({ request_id, donor_id });

    //   const requestInfo = await RequestInfo.findOne({ request_id });

    //   if (requestInfo) {
    //     requestInfo.noOfInterestedDonors -= 1;
    //     await requestInfo.save();
    //   } else {
    //     console.error(
    //       "RequestInfo document not found for request_id:",
    //       request_id
    //     );
    //   }
    // }

    const newDonation = new DonationHistory({
      donor_id,
      request_id,
      amount_Donated,
    });

    await newDonation.save();

    const user = await User.findOne({ donor_id });

    if (user) {
      user.totalAmountDonated += parseInt(amount_Donated);
      user.lastDonationDate = newDonation.dateOfDonation;
      await user.save();
    } else {
      console.error("User document not found for donor_id:", donor_id);
    }

    const requestinfo = await Request.findOne({ request_id });

    if (requestinfo) {
      requestinfo.amount_Remaining -= amount_Donated;
      await requestinfo.save();
    } else {
      console.error(
        "requestinfo document not found for request_id:",
        request_id
      );
    }

    res.status(201).json({
      result: newDonation,
      message: "Donation history entry added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the donation history entry",
    });
  }
};

const addRequests = async (req, res) => {
  try {
    const {
      bldGrpRequired,
      amount_Required,
      amount_Remaining,
      endDate_of_Request,
      endTime,
      donationType,
      emergencyLevel,
      location,
      locUrl,
    } = req.body;

    const newRequest = new Request({
      bldGrpRequired,
      amount_Required,
      amount_Remaining,
      endDate_of_Request,
      endTime,
      donationType,
      emergencyLevel,
      location,
      locUrl,
    });

    await newRequest.save();

    res.status(201).json({
      result: newRequest,
      message: "New request entry added successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the request entry" });
  }
};

// const addInterestedDonor = async (req, res) => {
//   const { requestId, donorId } = req.body;

//   try {
//     await InterestedDonor.create({ request_id: requestId, donor_id: donorId });

//     const requestInfo = await RequestInfo.findOne({ request_id: requestId });

//     if (requestInfo) {
//       requestInfo.noOfInterestedDonors += 1;

//       await requestInfo.save();

//       res.status(200).json({ message: "Interested donor added successfully." });
//     } else {
//       res
//         .status(404)
//         .json({ error: `RequestInfo with request_id ${requestId} not found.` });
//     }
//   } catch (error) {
//     console.error("Error adding interested donor:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const editRequest = async (req, res) => {
  try {
    const {
      request_id,
      bldGrpRequired,
      amount_Required,
      amount_Remaining,
      endDate_of_Request,
      endTime,
      donationType,
      emergencyLevel,
      location,
      locUrl,
    } = req.body;

    const filter = { request_id: request_id };

    await Request.updateOne(filter, {
      $set: {
        bldGrpRequired: bldGrpRequired,
        amount_Required: amount_Required,
        amount_Remaining: amount_Remaining,
        endDate_of_Request: endDate_of_Request,
        endTime: endTime,
        donationType: donationType,
        emergencyLevel: emergencyLevel,
        location: location,
        locUrl: locUrl,
      },
    });

    res.status(201).json({
      message: "request edit successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while editing the request entry" });
  }
};
module.exports = {
  getAllUsersEntirely,
  adminInfo,
  //sendMsg,
  addDonationHistory,
  addRequests,
  requestInfo,
  //addInterestedDonor,
  editRequest,
};
