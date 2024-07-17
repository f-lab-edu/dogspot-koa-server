import Koa from 'koa';
import Router from '@koa/router';
import http from 'http';
import cors from '@koa/cors';

import { setupPush } from './modules/push.module';
import { runConsumer } from './consumers/kafkaConsumer'; 

const router = new Router();
const app = new Koa();
const server = http.createServer(app.callback());

// 라우터 설정
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa with TypeScript!';
});

// CORS 설정
app.use(cors({
  origin: '*', // 모든 출처를 허용하는 것은 개발 환경에서만 사용하세요
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type'],
}));

// 라우터를 미들웨어로 사용
app.use(router.routes()).use(router.allowedMethods());

// Socket.IO 설정
setupPush(server);

// 서버 포트 설정
const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  runConsumer().catch(console.error);
});
