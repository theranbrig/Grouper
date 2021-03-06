const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// MIDDLEWARE

// Decode JWT for user ID on request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// Populate user in request
server.express.use((req, res, next) => {
  if (!req.userId) return next();
  const user = db.query.user({ where: { id: req.userId } }, '{id, permissions, email, username}');
  req.user = user;
  next();
});

// Start server
server.start(
  {
    cors: {
      credentials: true,
      origin: [
        process.env.FRONTEND_URL,
        'http://localhost:19002',
        'http://localhost:19001',
        'http://localhost:19000',
        'http://127.0.0.1:19000',
      ],
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
