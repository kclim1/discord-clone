const cors = require('cors');

const PORT = process.env.PORT || 3000;
const FRONTEND_ROUTE = "http://localhost:" + PORT

const corsOptions = {
  origin: `${FRONTEND_ROUTE}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Export the configured CORS middleware directly
module.exports = cors(corsOptions);