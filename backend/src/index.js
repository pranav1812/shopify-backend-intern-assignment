require('dotenv').config({ path: './.env' });
const app = require('./app');
const http = require('http');

const { PORT, ENV } = require('./utils/config');
// Connection to mongodb
require('./db/mongoose');

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} ENV-${ENV}`)
);