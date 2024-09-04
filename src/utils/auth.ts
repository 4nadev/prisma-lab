import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // em um arquivo .env em produção

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
