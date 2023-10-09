const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);  //401 - Unauthorized
    const refreshToken = cookies?.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
            const role = foundUser?.role;
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "id": decoded.id,
                        "role": role 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ id:decoded.id, role: role, token: accessToken })
        }
    );
}

module.exports = { handleRefreshToken }