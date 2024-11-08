package com.softsim.lcsoftsim.data.model


data class LoginRequest(
    val email: String,
    val password: String
)
data class UserLogged(
    val id: String,
    val username: String,
    val email: String,
    val cin: String
)
data class LoginResponse(
    val success: Boolean,
    val user: UserLogged,
    val message: String,
    val token: String
)


data class RegisterRequest(
    val username: String,
    val email: String,
    val cin: String,
    val password: String,
)
data class RegisterResponse(
    val status: Int,
    val code: Int,
    val message: String,
    val email: String, // or other relevant fields
    val username: String ,// or other relevant fields
    val id: String // or other relevant fields
)