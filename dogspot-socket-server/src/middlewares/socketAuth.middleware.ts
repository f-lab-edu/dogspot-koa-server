import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from '../domains/user/repositories/userRepository';

dotenv.config();

export const socketAuthMiddleware = async(socket: Socket, next: (err?: Error) => void) => {
  const userRepository = new UserRepository();
  const token = socket.handshake.auth.token as string;

  if (!token) {
    return next(new Error('Authorization token is missing'));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new Error('JWT_SECRET is not defined'));
  }

  try {
    const decoded = jwt.verify(token, secret) as { userIdx: number, OS: string, iat: number, exp: number };
    const user = await userRepository.findUserByIdx(decoded.userIdx);
    console.log('decoded##" ', user);
    
    // socket.user = decoded; // 디코딩된 사용자 정보를 소켓에 저장
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
};
