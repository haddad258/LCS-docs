const axios = require('axios');

const API_URL = "http://192.168.1.28:3009";
const Apis = {
  api_planpacksPost: `${API_URL}/api/planpacks`,
};

// Function to simulate a single user making multiple requests
async function fetchMultipleAPIs(userId) {
  const startTime = performance.now();
  console.log(`User ${userId} - Starting API requests`);

  const promises = [];

  // Simulate POST requests for each user
  for (let i = 1; i <= 10; i++) {
    console.log(`User ${userId} - Posting data ${i}`);
    promises.push(
      axios.post(Apis.api_planpacksPost, {
        name: `PlanPack_${userId}_` + i,
        title: `Title_${userId}_` + i,
        keyword: `Keyword_${userId}_` + i,
        description: `Description_${userId}_` + i,
      })
    );
  }

  // Simulate GET requests for each user
  for (let i = 1; i <= 3; i++) {
    console.log(`User ${userId} - Getting data ${i}`);
    promises.push(axios.get(Apis.api_planpacksPost));
  }

  try {
    // Await all promises
    const responses = await Promise.all(promises.map(p => p.catch(error => ({ error }))));

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    console.log(`User ${userId} - Elapsed time:`, elapsedTime, "ms");

    // Process each response
    responses.forEach((response, index) => {
      if (response.error) {
        console.error(`User ${userId} - Request ${index} failed:`, response.error.message);
      } else {
        console.log(`User ${userId} - Request ${index} succeeded:`, response.data);
      }
    });

    console.log(`User ${userId} - Total successful responses:`, responses.filter(r => !r.error).length);

  } catch (error) {
    console.error(`User ${userId} - Unexpected error occurred:`, error);
  }
}

// Function to simulate multiple users making requests concurrently
async function simulateMultipleUsers(userCount) {
  const userPromises = [];

  // Create a new "user" for each simulation
  for (let userId = 1; userId <= userCount; userId++) {
    userPromises.push(fetchMultipleAPIs(userId));
  }

  // Wait for all users' requests to complete
  try {
    await Promise.all(userPromises);
    console.log(`${userCount} users have completed their API calls.`);
  } catch (error) {
    console.error('An error occurred while simulating multiple users:', error);
  }
}

// Simulate multiple users (e.g., 5 users)
simulateMultipleUsers(5);
