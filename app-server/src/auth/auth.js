const moment = require('moment');
const jwt = require('jwt-simple');
const Schemas = require(`./schemas`);

function createToken(email) {
  const token = {
    exp: moment().add(1, 'minutes').unix(),
    iat: moment().unix(),
    email: email
  };

  return jwt.encode(token, "test");
}

function decodeToken(token, callback) {
    const tokeInfo = jwt.decode(token, "test");    
    if(!moment().unix() > tokeInfo.exp){
        callback(null);
    } else {
        callback(tokeInfo)
    }
}

function ensureAuthentication(request, response, next) {
    if (!(request.headers && request.headers.authorization)) {
      return response.status(400).json({
        status: 'Failed to retrieve auth token.'
      });
    }
  
    //Pull token from header
    let header = request.headers.authorization.split(' ');
    let token = header[1];

    decodeToken(token).then(tokenInfo => {
        if (!tokenInfo) {
            return response.status(401).json({
                status: 'Unauthorized. Failed to decode token'
            });
        } 
        else {
            // check if the user still exists in the db
            return Schemas.Account.findOne({ email: { $eq: tokenInfo.email } })
            .then((user) => {
                next();
            })
            .catch((err) => {
                response.status(500).json({
                status: 'Error occurred while validating token.'
                });
            });
        }
    });
  }

module.exports = {
  createToken,
  ensureAuthentication
};