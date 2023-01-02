import express from 'express';
import * as dotenv from 'dotenv';
import User from '../../models/User.js';
import { setToken } from '../../helpers/utils.js';
import crypto from 'crypto';

dotenv.config();

// Auth Router
const route = () => {
  const router = new express.Router();
  // Login
  router.route('/login').post((req, res) => {
    const { username, password, email } = req.body;

    if ((username || email) && password) {
      User.findOne({
        $or: [{ username: username }, { email: email }],
      })
        .then((user) => {
          const token = setToken(user);

          const hashPassword = crypto
            .Hmac('sha256', process.env.APIPASSKEY)
            .update(password)
            .digest('hex');

          if (hashPassword === user.password) {
            User.updateOne(
              {
                $or: [
                  {
                    username: username,
                  },
                  { email: email },
                ],
              },
              {
                $set: {
                  last_login: Date.now(),
                  token: token,
                },
              }
            ).then(() => {});

            res.send({
              status: 200,
              data: {
                username: user.username,
                token: token,
              },
            });
          } else {
            res.send({
              status: 400,
              message: 'Wrong username or password.',
            });
          }
        })
        .catch((err) => {
          res.send({
            status: 400,
            message: err.message,
          });
        });

      return false;
    }

    res.send({
      status: 400,
      message: err.message,
    });
  });
  // Register
  router.route('/register').put((req, res) => {
    const { username, password, email } = req.body;

    if (username && password) {
      const hashPassword = crypto
        .Hmac('sha256', process.env.APIPASSKEY)
        .update(password)
        .digest('hex');

      const newUser = new User({
        username: username,
        password: hashPassword,
        email: email,
        created_date: Date.now(),
      });

      const token = setToken(newUser);
      newUser.token = token;

      newUser
        .save()
        .then((user) => {
          res.send({
            status: 201,
            data: {
              username: user.username,
              token: user.token,
            },
          });
        })
        .catch((err) => {
          res.send({
            status: 400,
            message: err.message,
          });
        });
    }
  });

  return router;
};
export default {
  route,
  routePrefix: `/${process.env.VERSION}/auth`,
};
