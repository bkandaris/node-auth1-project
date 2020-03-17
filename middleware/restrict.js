const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

const sessions = {};

function restrict() {
  // reusable (DRY Code) for error messaging
  const authError = {
    message: 'Invalid credentials'
  };

  return async (req, res, next) => {
    try {
      // const { username, password } = req.headers;
      // // makeing sure that these values are actually present in the request header
      // if (!username || !password) {
      //   return res.status(401).json(authError);
      // }

      // const user = await Users.findBy({ username }).first();
      // //if the user doesn't exist throw an error
      // if (!user) {
      //   return res.status(401).json(authError);
      // }

      // const passwordValid = await bcrypt.compare(password, user.password);
      // // If password is not correct throw an error
      // if (!passwordValid) {
      //   return res.status(401).json(authError);
      // }

      // const { authorization } = req.headers;
      // if (!sessions[authorization]) {
      //   return res.status(401).json(authError);
      // }

      // const { cookie } = req.headers;
      // if (!cookie) {
      //   return res.status(401).json(authError);
      // }

      // const authToken = cookie.replace('token=', '');

      // if (!sessions[authToken]) {
      //   return res.status(401).json(authError);
      // }

      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { restrict, sessions };
