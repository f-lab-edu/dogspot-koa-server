import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.headers.authorization?.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = 'Authorization token is missing';
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret);
    ctx.state.user = decoded; // 디코딩된 사용자 정보를 상태에 저장
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = 'Invalid token';
  }
};
