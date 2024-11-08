// ProfileDatabaseHelper.kt
package com.softsim.lcsoftsim.data.local.profile

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

private const val DATABASE_NAME = "ProfilesLCS.db"
private const val DATABASE_VERSION = 1

class ProfileDatabaseHelper(context: Context) : SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {

    override fun onCreate(db: SQLiteDatabase) {
        val createTableQuery = """
            CREATE TABLE Profiles (
                id TEXT PRIMARY KEY NOT NULL,  -- Changed from INTEGER to TEXT to match the UUID format
                lpa_esim TEXT NOT NULL DEFAULT 'default_value',
                iccid TEXT NOT NULL UNIQUE DEFAULT 'default_value',
                imsi TEXT NOT NULL DEFAULT 'default_value',
                mnc TEXT NOT NULL DEFAULT 'default_value',
                mcc TEXT NOT NULL DEFAULT 'default_value',
                number TEXT NOT NULL DEFAULT 'default_value',
                brand TEXT NOT NULL DEFAULT 'default_value',
                ki TEXT NOT NULL DEFAULT 'default_value',
                norm_ref TEXT DEFAULT 'default_value',
                type TEXT NOT NULL DEFAULT 'default_value',
                country_code TEXT NOT NULL DEFAULT 'default_value',
                operator TEXT DEFAULT 'default_value',
                description TEXT DEFAULT 'default_value',
                status INTEGER NOT NULL DEFAULT 0,
                active_date TEXT DEFAULT 'default_value',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
        """.trimIndent()

        db.execSQL(createTableQuery)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        // Handle database upgrade as needed
        db.execSQL("DROP TABLE IF EXISTS Profiles")
        onCreate(db)
    }
}
