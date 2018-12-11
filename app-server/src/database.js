require(`dotenv`).config({ path: `../../.env` });

// possibly move these to .env file
const PREFIX = `mongodb://`;
const HOST = `mongo`;
const PORT = `27017`;
const NAME = `retirement`;

module.exports = DATABASE_URI = `${PREFIX}${HOST}:${PORT}/${NAME}`;
