package com.softsim.lcsoftsim.activity


import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.FileProvider
import com.softsim.lcsoftsim.R
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import androidx.lifecycle.lifecycleScope
import com.softsim.lcsoftsim.api.ApiConfigToken
import kotlinx.coroutines.launch



import android.app.Activity
import android.graphics.*
import android.graphics.drawable.BitmapDrawable
import android.util.Base64
import android.util.Size
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.PopupMenu
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.fragment.app.DialogFragment
import com.softsim.lcsoftsim.databinding.ActivityDetectFacesBinding
import com.softsim.lcsoftsim.utils.RandomColors
import com.softsim.lcsoftsim.utils.ResizeTransformation
import com.regula.facesdk.FaceSDK
import com.regula.facesdk.configuration.FaceCaptureConfiguration
import com.regula.facesdk.detection.request.DetectFacesConfiguration
import com.regula.facesdk.detection.request.DetectFacesRequest
import com.regula.facesdk.detection.request.OutputImageCrop
import com.regula.facesdk.detection.request.OutputImageParams
import com.regula.facesdk.detection.response.DetectFaceResult
import com.regula.facesdk.detection.response.DetectFacesResponse
import com.regula.facesdk.enums.OutputImageCropAspectRatio
import com.regula.facesdk.model.results.FaceCaptureResponse
import com.regula.facesdk.exception.InitException
import java.io.FileOutputStream

class UploadIdentityDetected : AppCompatActivity() {

    enum class Scenario {
        CROP_ALL, CROP_CENTER, SCENARIO_1, SCENARIO_2
    }

    @Transient
    private lateinit var binding: ActivityDetectFacesBinding
    private lateinit var scenario: Scenario
    private lateinit var response: DetectFacesResponse
    private lateinit var bitmapToDetect: Bitmap
    private lateinit var externalBitmap: Bitmap
    private lateinit var currentPhotoPath: String
    private lateinit var uploadButton: Button
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityDetectFacesBinding.inflate(layoutInflater)
        setContentView(binding.root)
        FaceSDK.Instance().initialize(this) { status: Boolean, e: InitException? ->
            if (!status) {
                Toast.makeText(
                    this@UploadIdentityDetected,
                    "Init finished with error: " + if (e != null) e.message else "",
                    Toast.LENGTH_LONG
                ).show()
                return@initialize
            }
            Log.d("MainActivity", "FaceSDK init completed successfully")
        }

        setImage(R.drawable.face1)
        binding.imageViewMain.setOnClickListener { showMenu(binding.imageViewMain) }


        binding.imageViewSample5.setOnClickListener {
            setImage(externalBitmap)
        }
        uploadButton = findViewById(R.id.buttonUploadImage)
        uploadButton.setOnClickListener {
            uploadImageCheck()
        }

        binding.button1.setOnClickListener { updateScenario(Scenario.CROP_CENTER, it) }
        binding.button2.setOnClickListener { updateScenario(Scenario.CROP_ALL, it) }
        binding.button3.setOnClickListener { updateScenario(Scenario.SCENARIO_1, it) }
        binding.button4.setOnClickListener { updateScenario(Scenario.SCENARIO_2, it) }

        binding.buttonPick.setOnClickListener {
            showMenu(binding.buttonPick)
        }
        binding.buttonDetect.setOnClickListener {
            when (scenario) {
                Scenario.CROP_CENTER -> detectFacesCropCenter()
                Scenario.CROP_ALL -> detectFacesCropAll()
                Scenario.SCENARIO_1 -> detectFacesScenario1()
                Scenario.SCENARIO_2 -> detectFacesScenario2()
            }
        }
        updateScenario(Scenario.CROP_CENTER, binding.button1)
    }
    private  fun uploadImageCheck(){
        lifecycleScope.launch {
            try {
                Log.d("testuploadButton","testuploadButton")

                // Convert bitmap to file
                val file = bitmapToFile(bitmapToDetect, "uploaded_image.png") // Name your file appropriately

                // Prepare the file part
                val filePart = prepareFilePart(file.absolutePath)

                // Prepare the entity part
                val entityPart = prepareEntityPart("customers")

                // Make the API call
                val response = ApiConfigToken.apiService.uploadImageIdentify(entityPart, filePart)

                if (response.isSuccessful) {
                    Log.d("Upload", "Success: ${response.body()?.toString()}")

                    setResult(RESULT_OK)  // Set result code to indicate success
                    finish()
                    //finish()
                } else {
                    Log.d("Upload", "Failure: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("Upload Error", e.toString())
            }
        }
    }
    private fun bitmapToFile(bitmap: Bitmap, fileName: String): File {
        val file = File(this.cacheDir, fileName)
        try {
            FileOutputStream(file).use { out ->
                if (!bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)) {
                    throw IOException("Failed to compress bitmap")
                }
            }
        } catch (e: IOException) {
            Log.e("Bitmap to File Error", "Error writing bitmap to file: ${e.message}")
            // Handle the error as needed (e.g., show a message to the user)
        }
        return file
    }
    fun prepareEntityPart(entityValue: String): RequestBody {
        return RequestBody.create("text/plain".toMediaTypeOrNull(), entityValue)
    }



    fun prepareFilePart(filePath: String, partName: String = "files"): MultipartBody.Part {
        val file = File(filePath)
        val requestFile = RequestBody.create("image/jpeg".toMediaTypeOrNull(), file)
        return MultipartBody.Part.createFormData(partName, file.name, requestFile)
    }
    private fun setImage(res: Int) {
        clearImageBackground()
        val option = BitmapFactory.Options()
        option.inScaled = false
        val bitmap = BitmapFactory.decodeResource(resources, res, option)
        bitmapToDetect = bitmap;
        binding.imageViewMain.setImageBitmap(bitmapToDetect);
    }

    private fun setImage(bitmap: Bitmap) {
        clearImageBackground()
        bitmapToDetect = bitmap
        externalBitmap = bitmap
        binding.imageViewMain.setImageBitmap(bitmapToDetect)
        binding.imageViewSample5.setImageBitmap(bitmapToDetect)
        binding.imageViewBackground5.visibility = View.VISIBLE
        binding.imageViewBackground5.setBackgroundColor(Color.BLUE)

        // Call upload after setting the image
        // uploadImageCheck()
    }


    private fun updateScenario(scenario: Scenario, view: View) {
        this.scenario = scenario
        binding.button1.setBackgroundColor(0)
        binding.button2.setBackgroundColor(0)
        binding.button3.setBackgroundColor(0)
        binding.button4.setBackgroundColor(0)
        view.setBackgroundResource(R.drawable.rounded_background)
    }

    private fun buttonEnable(enable: Boolean) {
        binding.buttonDetect.isEnabled = enable;
        binding.buttonPick.isEnabled = enable;
    }

    private fun detectFacesCropAll() {
        val request = DetectFacesRequest.cropAllFacesRequestForImage(bitmapToDetect)
        detectFaces(request)
    }

    private fun detectFacesCropCenter() {
        val request = DetectFacesRequest.cropCentralFaceRequestForImage(bitmapToDetect)
        detectFaces(request)
    }

    private fun detectFacesScenario1() {
        val crop = OutputImageCrop(OutputImageCropAspectRatio.OUTPUT_IMAGE_CROP_ASPECT_RATIO_4X5)
        val outputImageParams = OutputImageParams(crop)
        val config = DetectFacesConfiguration()
        config.onlyCentralFace = true
        config.outputImageParams = outputImageParams
        val request = DetectFacesRequest(bitmapToDetect, config)
        detectFaces(request)
    }

    private fun detectFacesScenario2() {
        val size = Size(500, 600)
        val crop = OutputImageCrop(
            OutputImageCropAspectRatio.OUTPUT_IMAGE_CROP_ASPECT_RATIO_2X3,
            size,
            Color.BLACK,
            true
        )
        val outputImageParams = OutputImageParams(crop)
        val config = DetectFacesConfiguration()
        config.onlyCentralFace = false
        config.outputImageParams = outputImageParams
        val request = DetectFacesRequest(bitmapToDetect, config)
        detectFaces(request)
    }

    private fun detectFaces(request: DetectFacesRequest) {
        buttonEnable(false)
        binding.progressBar.visibility = View.VISIBLE;
        FaceSDK.Instance().detectFaces(request) { response: DetectFacesResponse ->

            Log.d("detectFacesOP",response.allDetections.toString())
            buttonEnable(true)
            binding.progressBar.visibility = View.GONE;
            response.allDetections?.let {
                Log.d("detectFacesOP",request.toString())
                Log.d("detectFacesOP",response.toString())
                drawLandmark(it)
                val size = response.allDetections?.size ?: 0
                binding.buttonSee.text = "See Face Image ($size)"
                if(size>0){
                    Toast.makeText(this@UploadIdentityDetected, "You can upload this image", Toast.LENGTH_SHORT).show()
                    uploadButton.isEnabled = true

                }else{
                    Toast.makeText(this@UploadIdentityDetected, "Take Other Image Please", Toast.LENGTH_SHORT).show()
                    uploadButton.isEnabled = false
                }
                binding.buttonSee.visibility = View.VISIBLE
                binding.buttonSee.setOnClickListener(View.OnClickListener {
                    this.response = response
                    val dialog = ImageDialogFragment()
                    dialog.show(supportFragmentManager, "")
                })
            } ?: kotlin.run { binding.buttonSee.visibility = View.GONE }
        }
    }

    private fun drawLandmark(faces: MutableList<DetectFaceResult>) {
        val mutableBitmap: Bitmap =
            bitmapToDetect.copy(bitmapToDetect.config, true)
        val canvas = Canvas(mutableBitmap)
        val paint = Paint()
        paint.strokeWidth = 7.5f

        for (face in faces) {
            paint.style = Paint.Style.STROKE;
            face.faceRect?.let {
                paint.color = RandomColors().color
                canvas.drawRect(it, paint)
            }

            paint.style = Paint.Style.FILL;
            face.landMarks?.let {
                for (p in face.landMarks!!) {
                    canvas.drawCircle(p.x.toFloat(), p.y.toFloat(), 6.5F, paint);
                }
            }
        }
        binding.imageViewMain.setImageBitmap(mutableBitmap)
    }

    private fun showMenu(view: View?) {
        val popupMenu = PopupMenu(this@UploadIdentityDetected, view)
        popupMenu.setOnMenuItemClickListener { menuItem: MenuItem ->
            when (menuItem.itemId) {
                R.id.gallery -> {
                    openGallery()
                    return@setOnMenuItemClickListener true
                }
                R.id.camera -> {
                    startFaceCaptureActivity()
                    return@setOnMenuItemClickListener true
                }
                R.id.photo -> {
                    openDefaultCamera()
                    return@setOnMenuItemClickListener  true
                }
                else -> return@setOnMenuItemClickListener false
            }
        }
        popupMenu.menuInflater.inflate(R.menu.menu, popupMenu.menu)
        popupMenu.show()
    }

    private fun getImageBitmap(imageView: ImageView?): Bitmap {
        imageView?.invalidate()
        val drawable = imageView?.drawable as BitmapDrawable
        return drawable.bitmap
    }

    private fun openGallery() {
        startForResult.launch(
            Intent(
                Intent.ACTION_PICK,
                MediaStore.Images.Media.INTERNAL_CONTENT_URI
            )
        )
    }

    private val startForResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            if (result.resultCode == Activity.RESULT_OK) {
                val intent = result.data
                intent?.data?.let {
                    val bitmap = contentResolver?.openInputStream(it).use { data ->
                        BitmapFactory.decodeStream(data)
                    }
                    val resizedBitmap = ResizeTransformation(1080).transform(bitmap)
                    binding.imageViewMain.setImageBitmap(resizedBitmap)
                    resizedBitmap?.let {
                        setImage(resizedBitmap)
                    }
                }
            }
        }


    private val requestPermissionLauncher =
        registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted: Boolean ->
            if (isGranted) {
                launchCamera()
            } else {
                Toast.makeText(
                    this@UploadIdentityDetected,
                    "Camera permission denied",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

    private fun openDefaultCamera() {
        when {
            ContextCompat.checkSelfPermission(
                this@UploadIdentityDetected,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED -> {
                launchCamera()
            }

            else -> {
                requestPermissionLauncher.launch(
                    Manifest.permission.CAMERA
                )
            }
        }
    }

    private fun launchCamera() {
        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startCameraForResult.launch(cameraIntent)
    }

    private val startCameraForResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            val photo = result.data?.extras?.get("data")
            if (photo is Bitmap)
                setImage(photo)
        }

    private fun startFaceCaptureActivity() {
        val configuration = FaceCaptureConfiguration.Builder().setCameraSwitchEnabled(true).build()

        FaceSDK.Instance().presentFaceCaptureActivity(
            this@UploadIdentityDetected,
            configuration
        ) { faceCaptureResponse: FaceCaptureResponse? ->
            if (faceCaptureResponse?.image != null) {
                faceCaptureResponse.image?.let {
                    setImage(it.bitmap)
                }
            }
        }
    }

    private fun clearImageBackground() {
        binding.imageViewBackground5.setBackgroundColor(0)
    }

    class ImageDialogFragment : DialogFragment() {
        override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
        ): View? {
            val rootView = inflater.inflate(
                R.layout.fragment_image,
                container,
                false
            )

            val imageView: ImageView =
                rootView.findViewById(R.id.imageViewCrop)
            val buttonNext: Button = rootView.findViewById(R.id.buttonNext)
            val images: List<DetectFaceResult> =
                (activity as UploadIdentityDetected).response.allDetections as List<DetectFaceResult>

            if (images.size < 2)
                buttonNext.visibility = View.GONE

            var num = 0
            buttonNext.setOnClickListener {
                num++
                if (num >= images.size)
                    num = 0
                setImage(imageView, images[num].cropImage)
            }

            setImage(imageView, images[0].cropImage)
            return rootView
        }

        private fun setImage(imageView: ImageView, image: String?) {

            image?.let {
                val decodedString: ByteArray = Base64.decode(it, Base64.NO_WRAP)
                imageView.setImageBitmap(
                    BitmapFactory.decodeByteArray(
                        decodedString,
                        0,
                        decodedString.size
                    )
                )
            }
        }
    }
}
