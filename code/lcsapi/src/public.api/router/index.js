const app = require("../../../index");
const { restRouterarticlesDiscounts } = require("../Articles/ArticlesDiscountsRoutes");
const { restRouterarticles } = require("../Articles/ArticlesRoutes");
const { restRouterconfigApp } = require("../app.config/ConfigAppsRoutes");
const { restRoutercustomers } = require("../customers/CustomersRoutes");
const { restRouterorders } = require("../customers/orders.Customers/CustomerOrdersRoutes");
const { restRouterpaymentcards } = require("../customers/payment.card/PaymentCardCustomersRoutes");
const { restRoutersubscriptionsProfiles } = require("../customers/subscriptions/SubscriptionsCustomerProfiles");
const { restRoutersubscriptions } = require("../customers/subscriptions/SubscriptionsCustomerRoutes");
const restRouter = app;
//Import routes  use unique route names
restRouter.use("/api/mobile/customers", restRoutercustomers);
restRouter.use("/api/mobile/subscriptions", restRoutersubscriptions);
restRouter.use("/api/mobile/profiles/subscriptions", restRoutersubscriptionsProfiles);


restRouter.use("/api/mobile/config/apps", restRouterconfigApp);
restRouter.use("/api/mobile/configs/articles", restRouterarticles);
restRouter.use("/api/mobile/discounts/articles", restRouterarticlesDiscounts);


restRouter.use("/api/mobile/ordes/customers", restRouterorders);
restRouter.use("/api/mobile/payment/card", restRouterpaymentcards);

///route imports and usage as needed
module.exports = restRouter;