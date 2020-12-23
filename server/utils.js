var jwt_decode = require('jwt-decode');

function getUserInfoFromToken (req) {
  var token = req.body.token || req.query.token || req.header['x-access-token'] || req.get('Authorization');
  return jwt_decode(token);
}

exports.requireRole = function (roles) {
  return function (req, res, next) {
      const userRole = getUserInfoFromToken(req).isAdmin ? 'admin' : 'teacher';
      if (userRole && roles.includes(userRole)) {
          next();
      } else {
          res.status(403).send("Permission denied.");
      }
  }
}

exports.getUserInfoFromToken = getUserInfoFromToken;