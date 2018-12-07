const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
let role = '';
//server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

/**
 * Checks if the user exists in the database.
 * @param {} param0
 */
function userExists({ email, password }) {
  let userIndex = userdb.users.findIndex(
    user => user.email === email && user.password === password
  );
  console.log('authAnswer = ', userIndex);
  if (userIndex !== -1) {
    role = userdb.users[userIndex].role;
    return true;
  } else return false;
}

/**
 * @POST /auth/login
 * Creates a JWT token if the correct email and password are provided.
 * @see https://www.techiediaries.com/fake-api-jwt-json-server/
 */
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!userExists({ email, password })) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token, role });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization.split(' ')[1] === undefined) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  } else {
    try {
      verifyToken(req.headers.authorization.split(' ')[1]);
      next();
    } catch (err) {
      const status = 401;
      const message = 'Error access_token is revoked';
      res.status(status).json({ status, message });
    }
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server');
});
