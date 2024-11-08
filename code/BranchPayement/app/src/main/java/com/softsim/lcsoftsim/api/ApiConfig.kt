package com.softsim.lcsoftsim.api
import com.softsim.lcsoftsim.data.local.profile.ApiResponseProfilesM
import com.softsim.lcsoftsim.data.local.profile.ProfilesM
import com.softsim.lcsoftsim.data.model.ApiResponseCardEntity
import com.softsim.lcsoftsim.data.model.ApiResponseForm
import com.softsim.lcsoftsim.data.model.ApiResponseFormId
import com.softsim.lcsoftsim.data.model.ApiResponseOrderId
import com.softsim.lcsoftsim.data.model.ApiResponseSubscriptions
import com.softsim.lcsoftsim.data.model.CardEntity
import com.softsim.lcsoftsim.data.model.CartOrder
import com.softsim.lcsoftsim.data.model.CartOrderResponse
import com.softsim.lcsoftsim.data.model.Category
import com.softsim.lcsoftsim.data.model.CreateSubscriptions
import com.softsim.lcsoftsim.data.model.LoginRequest
import com.softsim.lcsoftsim.data.model.LoginResponse
import com.softsim.lcsoftsim.data.model.Orders
import com.softsim.lcsoftsim.data.model.PaymentMode
import com.softsim.lcsoftsim.data.model.PlanPack
import com.softsim.lcsoftsim.data.model.RegisterCardPayment
import com.softsim.lcsoftsim.data.model.RegisterRequest
import com.softsim.lcsoftsim.data.model.RegisterResponse
import com.softsim.lcsoftsim.data.model.Subscriptions
import com.softsim.lcsoftsim.data.model.UploadResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Part
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.Call
import okhttp3.ResponseBody
interface ApiService {
    @POST("/api/mobile/customers/login")
    suspend fun loginUser(@Body request: LoginRequest): Response<LoginResponse>
    @POST("/api/mobile/customers")
    suspend fun registerUser(@Body request: RegisterRequest): Response<RegisterResponse>
    @Multipart
    @POST("upload")
    suspend // Replace with your actual endpoint
    fun uploadImage(@Part image: MultipartBody.Part): Call<ResponseBody>
    @GET("/api/mobile/config/apps/entity/categories")
    suspend fun getCategories(): Response<ApiResponseForm<Category>>
    @GET("/api/mobile/configs/articles")
    suspend fun getPlanPackSales(): Response<ApiResponseForm<PlanPack>>
    @GET("/api/mobile/discounts/articles")
    suspend fun getPlanPacks(): Response<ApiResponseForm<PlanPack>>
    @GET("/api/mobile/configs/articles/{id}")
    suspend fun getPlanPackById(@Path("id") id: String): Response<ApiResponseFormId<PlanPack>>
    @Multipart
    @POST("/api/mobiles/customers/images/upload")
    suspend fun uploadImageIdentify(
        @Part("entity") entity: RequestBody,
        @Part image: MultipartBody.Part
    ): Response<UploadResponse>

    @POST("/api/mobile/ordes/customers")
    suspend fun createOrders(@Body request: List<CartOrder>): Response<CartOrderResponse>
    @GET("/api/mobile/ordes/customers")
    suspend fun getOrders(): Response<ApiResponseOrderId<Orders>>

    @GET("/api/mobile/payment/card")
    suspend fun getPaymentMethods(): Response<ApiResponseCardEntity<CardEntity>>
    @POST("/api/mobile/payment/card")
    suspend fun registerCardPayment(@Body request: RegisterCardPayment): Response<ApiResponseCardEntity<CardEntity>>
    @GET("/api/mobile/config/apps/entity/paymentmode")
    suspend fun getPaymentModes(): Response<ApiResponseCardEntity<PaymentMode>>

    // POST API for creating a new subscription
    @POST("/api/mobile/subscriptions")
    suspend fun createSubscription(
        @Body subscription: CreateSubscriptions // The subscription details for creation
    ): Response<ApiResponseSubscriptions<CreateSubscriptions>>

    // GET API for retrieving all subscriptions
    @GET("/api/mobile/subscriptions")
    suspend fun getSubscriptions(): Response<ApiResponseSubscriptions<Subscriptions>>

    // GET API for retrieving a specific subscription by ID
    @GET("/api/mobile/config/apps/entity/subscriptions/{id}")
    suspend fun getSubscriptionById(
        @Path("id") subscriptionId: String // The ID of the subscription to retrieve
    ): Response<ApiResponseSubscriptions<Subscriptions>>


    @GET("/api/mobile/profiles/subscriptions")
    suspend fun getSubscriptionsProfiles(): Response<ApiResponseProfilesM<ProfilesM>>





    ///////////////////////////////////////////////////////////////////////

    @GET("/api/profiles/status/0")
    suspend fun getProfilesActive(): Response<List<RegisterRequest>>

}


