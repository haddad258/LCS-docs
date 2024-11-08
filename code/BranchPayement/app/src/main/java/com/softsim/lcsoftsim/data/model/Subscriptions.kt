package com.softsim.lcsoftsim.data.model


// Generic API response model
data class ApiResponseSubscriptions<T>(
    val status: Int,
    val message: String?,
    val data: List<T>? = null // Using a list for consistent data handling
)
// Model for Post response (adjust fields as needed for your use case)
data class CreateSubscriptions(
    val id: String, // Unique identifier for the post
    val customerId: String, // Foreign key reference to customers table
    val mode: String, // Title of the post
    val card: String?, // Content of the post
    val isNewSubscription: Boolean // Indicates if this is a new subscription
     )

// Model for Get response (adjust fields as needed for your use case)
data class Subscriptions(
    val id: String, // Unique identifier for the get response
    val requestId: String, // Associated request ID
    val data: String?, // Data retrieved in the response
    val status: String?, // Status of the response
    val created_at: String, // Created at timestamp
    val updated_at: String // Updated at timestamp
)

// Model for Subscriptions
data class Subscription(
    val id: String, // Unique identifier for the subscription
    val customerId: String, // Foreign key reference to customers table
    val profileId: String, // Foreign key reference to profilesId table
    val url: String, // URL for subscription details
    val created_at: String, // Created at timestamp
    val updated_at: String // Updated at timestamp
)