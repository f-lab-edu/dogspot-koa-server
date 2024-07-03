import Koa from 'koa';
import Router from '@koa/router';

const router = new Router();
const app = new Koa();


// 라우터 설정
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa with TypeScript!';
});

// 라우터를 미들웨어로 사용
app.use(router.routes()).use(router.allowedMethods());

// 서버 포트 설정
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});