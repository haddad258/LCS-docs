// DataManager.kt
package com.softsim.lcsoftsim.data.local.profile

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.util.Log

class DataManager(context: Context) {

    private val dbHelper = ProfileDatabaseHelper(context)
    private val db: SQLiteDatabase get() = dbHelper.writableDatabase

    // Add a new profile
    fun addProfile(profile: ProfilesM): Boolean {
        return try {
            Log.d("activatecode",profile.toString())
            val contentValues = ContentValues().apply {
                put("id", profile.id)  // Should be a string
                put("lpa_esim", profile.lpa_esim) // String
                put("iccid", profile.iccid) // String
                put("imsi", profile.imsi) // String
                put("mnc", profile.mnc) // String
                put("mcc", profile.mcc) // String
                put("number", profile.number) // String
                put("brand", profile.brand) // String
                put("ki", profile.ki) // String
                put("norm_ref", profile.norm_ref) // String
                put("type", profile.type) // String
                put("operator", profile.operator) // String
                put("description", profile.description) // String
                put("status", profile.status) // Integer
            }

            val result = db.insertOrThrow("Profiles", null, contentValues)
            Log.d("DataManager", "Profile added with id: $result")
            true
        } catch (e: Exception) {
            Log.e("DataManager", "Error adding profile: ${e.message}", e)
            false
        }
    }

    // Check if any profiles exist
    fun hasProfiles(): Boolean {
        db.rawQuery("SELECT COUNT(*) FROM Profiles", null).use { cursor ->
            return if (cursor.moveToFirst()) {
                cursor.getInt(0) > 0
            } else {
                false
            }
        }
    }

    // Retrieve all profiles
    fun getAllProfiles(): List<ProfilesM> {
        val profiles = mutableListOf<ProfilesM>()
        val query = "SELECT * FROM Profiles"

        db.rawQuery(query, null).use { cursor ->
            if (cursor.moveToFirst()) {
                do {
                    val profile = ProfilesM(
                        id = cursor.getString(cursor.getColumnIndexOrThrow("id")),
                        lpa_esim = cursor.getString(cursor.getColumnIndexOrThrow("lpa_esim")),
                        iccid = cursor.getString(cursor.getColumnIndexOrThrow("iccid")),
                        imsi = cursor.getString(cursor.getColumnIndexOrThrow("imsi")),
                        mnc = cursor.getString(cursor.getColumnIndexOrThrow("mnc")),
                        mcc = cursor.getString(cursor.getColumnIndexOrThrow("mcc")),
                        number = cursor.getString(cursor.getColumnIndexOrThrow("number")),
                        brand = cursor.getString(cursor.getColumnIndexOrThrow("brand")),
                        ki = cursor.getString(cursor.getColumnIndexOrThrow("ki")),
                        norm_ref = cursor.getString(cursor.getColumnIndexOrThrow("norm_ref")), // Fixed to norm_ref
                        type = cursor.getString(cursor.getColumnIndexOrThrow("type")),
                        country_code = cursor.getString(cursor.getColumnIndexOrThrow("country_code")),
                        operator = cursor.getString(cursor.getColumnIndexOrThrow("operator")),
                        description = cursor.getString(cursor.getColumnIndexOrThrow("description")),
                        status = cursor.getInt(cursor.getColumnIndexOrThrow("status"))
                    )
                    profiles.add(profile)
                } while (cursor.moveToNext())
            }
        }
        Log.d("DataManager", "Retrieved ${profiles.size} profiles from database.")
        return profiles
    }

    // Delete a profile by ICCID
    fun deleteProfileByIccid(iccid: String): Boolean {
        return try {
            val result = db.delete("Profiles", "iccid = ?", arrayOf(iccid))
            if (result > 0) {
                Log.d("DataManager", "Profile with iccid $iccid deleted successfully.")
                true
            } else {
                Log.w("DataManager", "No profile found with iccid $iccid.")
                false
            }
        } catch (e: Exception) {
            Log.e("DataManager", "Error deleting profile: ${e.message}", e)
            false
        }
    }

    // Update an existing profile
    fun updateProfile(profile: ProfilesM): Boolean {
        return try {
            val contentValues = ContentValues().apply {
                put("lpa_esim", profile.lpa_esim)
                put("imsi", profile.imsi)
                put("mnc", profile.mnc)
                put("mcc", profile.mcc)
                put("number", profile.number)
                put("brand", profile.brand)
                put("ki", profile.ki)
                put("norm_ref", profile.norm_ref)
                put("type", profile.type)
                put("country_code", profile.country_code)
                put("operator", profile.operator)
                put("description", profile.description)
                put("status", profile.status)
            }

            val result = db.update("Profiles", contentValues, "iccid = ?", arrayOf(profile.iccid))
            if (result > 0) {
                Log.d("DataManager", "Profile with iccid ${profile.iccid} updated successfully.")
                true
            } else {
                Log.w("DataManager", "No profile found with iccid ${profile.iccid}.")
                false
            }
        } catch (e: Exception) {
            Log.e("DataManager", "Error updating profile: ${e.message}", e)
            false
        }
    }

    // Close database connection
    fun close() {
        dbHelper.close()
    }
}
