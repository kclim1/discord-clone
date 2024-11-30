const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Export the configured CORS middleware directly
module.exports = cors(corsOptions);