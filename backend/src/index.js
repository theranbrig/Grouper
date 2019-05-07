const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');
var cors = require('cors');

const server = createServer();

server.express.use(cookieParser());

server.express.use(cors());

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
      origin:[ process.env.FRONTEND_URL, 'http://localhost:19000/', '127.0.0.1:19000', 'exp://192.168.0.178:19000', 'exp://v8-tp4.anonymous.grouper-native.exp.direct:80', '*/' ]
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
