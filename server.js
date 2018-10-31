const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

//server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  console.log('created token');
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  console.log('inside verify token');
  console.log('token', token);
  console.log(jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err));
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}


server.post('/auth/login', (req, res) => {
  console.log('logging in');
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    console.log('not logged in');
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({access_token})
  console.log('logged in ' + access_token);
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  console.log('auth header', req.headers.authorization.split(' ')[1])
  if (req.headers.authorization.split(' ')[1] === 'undefined') {
    const status = 401
    const message = 'Error in authorization format'
    console.log('not working in use');
    res.status(status).json({status, message})
    return
  } else {
    try {
      console.log('about to verify token');
       verifyToken(req.headers.authorization.split(' ')[1])
       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
  }
  
})

server.use(router)

server.listen(3000, () => {
  console.log('Run Auth API Server')
})