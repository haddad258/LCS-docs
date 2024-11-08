const app = require("../../../../index");
const { restRouterconfigApp } = require("../App.Configs/ConfigAppsRoutes");
const { restRouterconfigAppImages } = require("../App.Configs/ConfigAppsRoutesImages");
const { restRouterarticles } = require("../Articles/ArticlesRoutes");
const { restRouterdiscountarticles } = require("../Articles/discounts/DiscountsArticlesRoutes");
const { restRouterarticlesnotes } = require("../Articles/notes/ArticlesNoteRoutes");
const { restRouterplacksarticles } = require("../Articles/placks/PlacksArticlesRoutes");
const { restRouterproviderarticles } = require("../Articles/provider.articles/ProviderArticlesRoutes");
const { restRouterorganization_gen_info } = require("../company/OrganizationIgenInfoRoutes");
const { restRoutercustomers } = require("../customers/CustomersRoutes");
const { restRoutercustomerImages } = require("../customers/CustomersRoutesImages");
const { restRouterpaymentcards } = require("../customers/payement.Cards/PaymentCardRoutes");
const { restRoutersubscriptions } = require("../customers/subscriptions/SubscriptionRoutes");
const { restRouterpaymentmode } = require("../payment.mode/PayementModeRoutes");
const { restRouterplack } = require("../plack/PlackRoutes");
const { restRouterprofilesId } = require("../profilesId/ProfilesIdRoutes");
const { restRouterproviders } = require("../providers/ProvidersRoutes");
const { restRouterprovidercalendar } = require("../providers/providercalendar/ProviderCalendarRoutes");
const { restRouterpublications } = require("../providers/publications/PublicationRoutes");
const restRouter = app;
// Import routes  use unique route names


restRouter.use("/api/company/config/info", restRouterorganization_gen_info);


restRouter.use("/api/customers", restRoutercustomers);
restRouter.use("/api/subscriptions", restRoutersubscriptions);
restRouter.use("/api/images/customers/", restRoutercustomerImages);
restRouter.use("/api/payments/cards/", restRouterpaymentcards);


///////////////////////////////////////////////////////////////



restRouter.use("/api/providers", restRouterproviders);
restRouter.use("/api/config/providers/articles", restRouterproviderarticles);
restRouter.use("/api/config/providers/publications", restRouterpublications);
restRouter.use("/api/config/providers/calendars", restRouterprovidercalendar);


///////////////////////////////////////////////////////////////
restRouter.use("/api/configs/payment/mode", restRouterpaymentmode);
restRouter.use("/api/configs/profiles/keys", restRouterprofilesId);


///////////////////////////////////////////////////////////////
restRouter.use("/api/config/apps", restRouterconfigApp);
///////////////////////////////////////////////////////////////


restRouter.use("/api/configs/articles", restRouterarticles);
restRouter.use("/api/configs/discounts/articles", restRouterdiscountarticles);
restRouter.use("/api/configs/placks/articles", restRouterplacksarticles);
restRouter.use("/api/configs/review/crm/articles", restRouterarticlesnotes);

restRouter.use("/api/configs/placks", restRouterplack);
restRouter.use("/api/images/articles", restRouterconfigAppImages);


///////////////////////////////////////////////////////////////
restRouter.use("/api/configs/placks", restRouterplack);





///route imports and usage as needed

module.exports = restRouter;