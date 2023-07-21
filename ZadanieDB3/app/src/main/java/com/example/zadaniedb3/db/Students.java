package com.example.zadaniedb3.db;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Students {

    @PrimaryKey(autoGenerate = true)
    public int studentId;

    @ColumnInfo(name = "meno")
    public String meno;

    @ColumnInfo(name = "odborId")
    public int odborId;

//    @ColumnInfo(name = "Studuje ?")
//    public boolean status;
}
