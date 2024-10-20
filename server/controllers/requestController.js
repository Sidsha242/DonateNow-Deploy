const Request = require("../models/requestModel");

const getRequests = async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json(allRequests);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching joined data" });
  }
};

const delReq = async (req, res) => {
  const reqid = req.params.id;

  try {
    const deletedReq = await Request.deleteOne({ request_id: reqid });

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

const getRequestDetails = async (req, res) => {
  const requestId = req.params.id;
  try {
    const requestData = await Request.findOne({ request_id: requestId });
    res.json(requestData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching donor data." });
  }
};

module.exports = { getRequests, delReq, getRequestDetails };
