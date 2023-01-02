import jwt from 'jsonwebtoken';

export const setToken = (user, expireTime) => {
  return jwt.sign(
    {
      id: user.id,
      roleID: 0,
    },
    process.env.APIPASSKEY,
    {
      expiresIn: expireTime || 48,
    }
  );
};
