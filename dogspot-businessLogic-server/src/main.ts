import Koa from 'koa';
import Router from '@koa/router';

import { runConsumer } from './kafka/consumer'; 
import { initializeProducer } from './kafka/producer'; 
import * as loggerNS from './core/config/logger.config'; // 네임스페이스로 가져오기

const router = new Router();
const app = new Koa();


// 라우터 설정
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Dogspot business logic server!';
});

// 서버 포트 설정
const PORT = 3004;
app.listen(PORT, () => {
  loggerNS.default.info({
    message: `Server is running on port ${PORT}`,
    stack:`Server is running on port ${PORT}`,
    context: 'app listen',
  });
  runConsumer().catch(console.error);
  initializeProducer().catch(console.error);
});
