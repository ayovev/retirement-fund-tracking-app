`use strict`;

const moment = require(`moment`);
const jwt = require(`jwt-simple`);
const tokenSecret = `testSecret`;

function createToken(email) {
  const token = {
    exp: moment().add(30, `minutes`).unix(),
    iat: moment().unix(),
    email: email
  };

  return jwt.encode(token, tokenSecret);
}

function decodeToken(token, callback) {
  const tokeInfo = jwt.decode(token, tokenSecret);
  if (!moment().unix() > tokeInfo.exp) {
    callback(null);
  }
  else {
    callback(tokeInfo);
  }
}

function ensureAuthentication(request, response, next) {
  if (!(request.headers && request.headers.authorization)) {
    return response.status(400).json({
      status: `Failed to retrieve auth token.`
    });
  }

  // Pull token from header
  // Expected Auth header format: 'Bearer token'
  const header = request.headers.authorization.split(` `);

  if (header.length != 2) {
    return response.status(401).json({
      status: `Unauthorized. Failed to decode token`
    });
  }

  const token = header[1];

  decodeToken(token).then((tokenInfo) => {
    if (!tokenInfo) {
      return response.status(401).json({
        status: `Unauthorized. Failed to decode token`
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
            status: `Error occurred while validating token.`
          });
        });
    }
  });
}

module.exports = {
  createToken,
  ensureAuthentication
};
