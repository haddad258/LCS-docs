const app = require("../../../../index");
const { restRouterorders } = require("../orders/OrdersRoutes");
const { restRouterstatusorders } = require("../status.orders/StatusOrdersRoutes");
const { restRouterordersdetails } = require("../orders.details/OrdersDetailsRoutes");

const restRouter = app;
restRouter.use("/api/accounts/status/orders", restRouterstatusorders);
restRouter.use("/api/accounts/list/orders", restRouterorders);
restRouter.use("/api/accounts/details/orders", restRouterordersdetails);





///route imports and usage as needed

module.exports = restRouter;