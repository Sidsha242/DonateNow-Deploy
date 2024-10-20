const User = require("../models/userModel");
const DonationHistory = require("../models/donationHistoryModel");

const getDetailsOfUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const donorData = await User.findOne({ donor_id: userId });
    res.json(donorData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching donor data." });
  }
};

const getAllDonationsofUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const donorDonationData = await DonationHistory.find({ donor_id: userId });

    res.json(donorDonationData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching donor data." });
  }
};

const getTotalBloodDonatedByUser = async (req, res) => {
  //for dashboard
  const userId = req.params.id;
  try {
    const totalDonatedBlood = await DonationHistory.aggregate([
      {
        $match: { donor_id: userId }, // Match rows with the specified donor_id
      },
      {
        $group: {
          _id: null, // Group all matched rows
          totalAmountDonated: { $sum: "$amount_Donated" }, // Calculate the sum of amount_Donated
        },
      },
    ]);

    if (totalDonatedBlood.length > 0) {
      res.json({ totalAmountDonated: totalDonatedBlood[0].totalAmountDonated });
    } else {
      res.json({ totalAmountDonated: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while calculating total donated blood.",
    });
  }
};

const delUser = async (req, res) => {
  const userid = req.params.id;
  try {
    const deletedReq = await User.deleteOne({ donor_id: userid });

    if (deletedReq) {
      console.log("Request deleted successfully:", deletedReq);
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      console.log("Request not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = async (req, res) => {
  const { user_id, image } = req.body;

  const filter = { donor_id: user_id };

  console.log(image);

  try {
    await User.updateOne(filter, {
      $set: {
        image: image,
      },
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
};

module.exports = {
  getDetailsOfUser,
  getAllDonationsofUser,
  getTotalBloodDonatedByUser,
  delUser,
  uploadImage,
};
