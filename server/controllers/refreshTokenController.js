const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies; //cookie stores refreshToken
  // console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401); //if not there send 401 token
  const refreshToken = cookies?.jwt; //retrieve refresh Token

  const foundUser = await User.findOne({ refreshToken }).exec(); //find user with refresh token...this is to make sure user is only accessing
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    //JWT verify method is used for verify the token the take two arguments one is token string value, and second one is secret key for matching the token is valid or not. The validation method returns a decode object that we stored the token in.(decoded)
    if (err || foundUser.donor_id !== decoded.donor_id)
      //check if decode user id is same as user requesting refresh
      return res.sendStatus(403);
    const role = foundUser?.role;
    const accessToken = jwt.sign(
      //generate new access Token
      {
        UserInfo: {
          donor_id: decoded.donor_id,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "40s" }
    );
    res.json({
      donor_id: decoded.donor_id,
      role: role,
      accessToken: accessToken,
    });
  });
};

module.exports = { handleRefreshToken };
