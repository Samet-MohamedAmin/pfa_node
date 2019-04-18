let jwt = require('jsonwebtoken');
const config = require('./secret');

let checkAdminToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else if(decoded.role=='personal'){
        req.decoded = decoded;
        next();
      }
      else if(decoded.role !='personal'){
        return res.json({
            success: false,
            message: 'Admin privileges is required'
          });
      }

    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkAdminToken: checkAdminToken
};