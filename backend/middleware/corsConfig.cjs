const cors = require('cors');

const corsOptions = {
  origin: `${process.env.FRONTEND_ROUTE}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Export the configured CORS middleware directly
module.exports = cors(corsOptions);