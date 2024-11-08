const app = require("../../index");
function history(action, data, customer, format, user, idhistory) {
  const event = { action: action, fields: [data] };

  app.db.transaction((trx) => {
    trx.table("history").insert({
      id: idhistory,
      format: format,
      customer: customer,
      users: user,
      event: JSON.stringify(event),
    });
  });
}

module.exports = history;
