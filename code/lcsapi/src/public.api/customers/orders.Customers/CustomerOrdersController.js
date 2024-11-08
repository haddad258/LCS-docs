
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const calculateTotals = (products) => {
  return products.reduce(
    (acc, product) => {
      acc.totalQuantity += product.qty;
      acc.totalPrice += product.totalPrice;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
};
// Example of using the reducer

const addCustomerOrders = async (req, res, next) => {
  try {
    // Calculate totals from the request body
    const totals = calculateTotals(req.body);
    console.log(req.body);

    // Insert new order and retrieve the inserted order ID
    const [orderId] = await app.db
      .table('orders')
      .insert({
        customerId: req.userId,
        price: totals.totalPrice,
        quantity: totals.totalQuantity,
      })
      .returning('id'); // Ensure to return the ID of the inserted order
    console.log('New Order ID:', orderId);
    // Prepare order details based on the request body
    const orderDetails = req.body.map(item => ({
      articleId: item.articleId, // Ensure the item has this field
      placksId: item.placksId, // Ensure the item has this field
      providerId: item.providerId, // Ensure the item has this field
      ordersId: orderId.id, // Link the details to the newly created order
      quantity: item.qty,
      price: item.totalPrice,
      status: item.status || 0, // Default status if not provided
    }));
    // Insert order details into ordersdetails table
    await app.db.table('ordersdetails').insert(orderDetails);
    // Respond with success message
    res.status(200).json({
      message: "New orders created successfully",
      status: 200,
      orderId: orderId, // Optionally return the ID of the new order
      data: req.body,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(new createHttpError.BadRequest("Invalid values to create an order."));
  }
};


const updateCustomerOrders = async (req, res, next) => {
  try {
    await app.db
      .table("orders")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then(() => {
        res.status(200).json({
          message: "Successfully updated",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};

const getAllCustomerOrderss = async (req, res, next) => {
  try {
    console.log("customerss")
    await app.db
      .from("orders")
      .select("*")
      .where("customerId","=",req.userId)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "orders not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "orders fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getCustomerOrdersById = async (req, res, next) => {
  try {
    await app.db
      .from("orders")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "orders not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "orders fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addCustomerOrders,
  updateCustomerOrders,
  getAllCustomerOrderss,
  getCustomerOrdersById,
};
  