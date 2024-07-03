import Router from '@koa/router';

const router = new Router();
const walksPushController = require("../domains/walks_push/walks-push.controller");

router.get(
  // 회원 토큰 인증
  "/",
  walksPushController.push
);

module.exports = router;
