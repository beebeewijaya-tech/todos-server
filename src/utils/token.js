const jwt = require('jsonwebtoken')

async function decodeToken(token) {
  if (!token) return null
  const tokenVerify = jwt.decode(token)
  return tokenVerify
}

async function signToken(user) {
  const token = jwt.sign(user, 'secret', { expiresIn: 60 * 60 * 24 });
  return token
}

module.exports = {
  decodeToken,
  signToken
}