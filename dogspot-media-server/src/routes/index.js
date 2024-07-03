import Router from '@koa/router';
const router = new Router();

const walks_push = require("./walks_push.routes");

router.use("/walks_push", walks_push);


module.exports = router;
