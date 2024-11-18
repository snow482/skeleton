const jwt = require("jsonwebtoken")

function verifyRefreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  
      res.locals.user = user; // не трогать 
  
      next();
    } catch (error) {
        console.log(error);
        
      console.log('Invalid refresh token');
      res.clearCookie('refreshToken').sendStatus(401);
    }
  }

module.exports = verifyRefreshToken