const bcryptjs = require('bcryptjs')

async function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10);
  const hashed = bcryptjs.hashSync(password, salt);

  return hashed
}

async function comparePassword(password, hashPassword) {
  const isPassword = await bcryptjs.compare(password, hashPassword)
  return isPassword
}

module.exports = {
  hashPassword,
  comparePassword
}