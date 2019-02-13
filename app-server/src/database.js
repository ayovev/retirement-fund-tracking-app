`use strict`;

if (process.env.NODE_ENV === `production`) {
  const PREFIX = `mongodb+srv`;
  const USER = process.env.DATABASE_USER;
  const PASSWORD = process.env.DATABASE_PASSWORD;
  const HOST = `cluster0-lpuxo.mongodb.net`;
  const NAME = `rta`;
  const PARAMETERS = `retryWrites=true`;

  module.exports = DATABASE_URI = `${PREFIX}://${USER}:${PASSWORD}@${HOST}/${NAME}?${PARAMETERS}`;
}
else {
  const PREFIX = `mongodb`;
  const HOST = `mongo`;
  const PORT = `27017`;
  const NAME = `rta`;

  module.exports = DATABASE_URI = `${PREFIX}://${HOST}:${PORT}/${NAME}`;
}
