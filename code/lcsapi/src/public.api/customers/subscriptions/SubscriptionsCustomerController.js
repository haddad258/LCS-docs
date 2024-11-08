
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const getRandomProfiles = async (numProfiles) => {
  try {
    const profiles = await app.db('profilesId')
      .orderByRaw('RANDOM()')
      .limit(numProfiles).first();
    return profiles;
  } catch (error) {
    console.error('Error fetching random profiles:', error);
  }
};

const addSubscriptionsCustomer = async (req, res, next) => {
  try {
    // Fetch one random profile
    console.log(req.body)
    const profiles = await getRandomProfiles(1);
    console.log(profiles)
    // Insert a new subscription using customerId from the request
    await app.db
      .table('subscriptions')
      .insert({
        customerId: req.userId,
        profileId: profiles.id,
        url:"default"
        // Optionally add any relevant profile fields if needed, e.g., profiles[0].id
      });

    // Respond with success
    res.status(200).json({
      message: "New subscription created",
      status: 200,
      data: req.body,
    });
  } catch (error) {
    console.log(error)
    next(new createHttpError.BadRequest("Invalid values to create a subscription."));
  }
};

const updateSubscriptionsCustomer = async (req, res, next) => {
  try {
    await app.db
      .table("subscriptions")
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

const getAllSubscriptionsCustomers = async (req, res, next) => {
  try {
    console.log("getAllSubscriptionsCustomers")
    await app.db
      .from("subscriptions")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "subscriptions not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "subscriptions fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getSubscriptionsCustomerById = async (req, res, next) => {
  try {
    await app.db
      .from("subscriptions")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "subscriptions not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "subscriptions fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const getProfilesBySubscriptionId = async (req, res, next) => {
  try {
    // Step 1: Get the profile IDs associated with the subscription
    const subscriptions = await app.db
      .from("subscriptions")
      // .where("customerId", "=", req.params.id); // Assuming you want to filter by customerId
      console.log(subscriptions)
    if (subscriptions.length === 0) {
      return res.json({
        message: "No subscriptions found for the given customer id",
        status: 200,
        data: [],
      });
    }

    // Extract the profile IDs
    const profileIds = subscriptions.map(sub => sub.profileId);

    // Step 2: Get the profiles using the extracted profile IDs
    const profiles = await app.db
      .from("profilesId")
      .select("*")
      .whereIn("id", profileIds);

    res.json({
      message: "Profiles fetched successfully",
      status: 200,
      data: profiles,
    });
  } catch (error) {
    console.log(error)
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
module.exports = {
  addSubscriptionsCustomer,
  updateSubscriptionsCustomer,
  getAllSubscriptionsCustomers,
  getSubscriptionsCustomerById,
  getProfilesBySubscriptionId
};
  