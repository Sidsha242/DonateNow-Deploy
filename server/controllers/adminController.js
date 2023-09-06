const User = require("../models/userModel");
const MedInfo = require ("../models/medInfoModel");
const mongoose = require("mongoose");
const db = mongoose.connection;

const getAllUsersEntirely = async(req, res) => {
    //const users = await User.find();
    const users = User.aggregate([
      {
         $lookup:
            {
              from: "medinfos",
              localField: "email",
              foreignField: "email",
              as: "usersdetails"
            }.pretty()
      },
       {
         $unwind: "$usersdetails"
       }
   ])
    try {
      console.log(users) ;
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
}

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
  res.send(result);
}

const sendMsg = async (req,res) => {
  const BloodGroup = req.body.bldgrp;
  const txtMsg = req.body.smsText;
  console.log(txtMsg);
  console.log(`Blood Group:${BloodGroup}`);
   
  const result = await db.collection('users').aggregate([
      {
        $lookup: {
          from: 'medinfos',
          localField: 'email',
          foreignField: 'email',
          as: 'usersdetails'
        }
      }
    ]).toArray();

   let filteredUsers = [];
   for (let i= 0; i<result.length; i++) 
   {
       if(result[i].usersdetails[0].bldgrp == BloodGroup) 
       {
           filteredUsers = [...filteredUsers, result[i]];
       }
   }

  var phoneNum_arr = [];
  for(let j=0;j<filteredUsers.length;j++)
  {
       console.log('Filtered Users:');
       console.log(filteredUsers[j]);
       phoneNum_arr[j] = filteredUsers[j].phonenum
  }


// for(let k =0 ; k<filteredUsers.length;k++)
// {
//     client.messages.create({

//         to: '+' + phoneNum_arr[k],
//       from: '+19382536013',
//         body: txtMsg

//     })
//     .then((message) => console.log('message sent'))
// }
}

module.exports = {getAllUsersEntirely, adminInfo, sendMsg};