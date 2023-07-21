package com.example.zadaniedb3.db;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {Odbor.class, Students.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {

    public abstract SchoolDao schoolDao();
    public static AppDatabase INSTANCE;

    public static AppDatabase getDBinstance(Context context){
        if(INSTANCE == null){
            INSTANCE = Room.databaseBuilder(context.getApplicationContext(),AppDatabase.class,"Skolska DB")
                    .allowMainThreadQueries()
                    .build();
        }
        return INSTANCE;
    }
}
