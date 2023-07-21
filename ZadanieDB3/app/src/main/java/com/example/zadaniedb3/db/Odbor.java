package com.example.zadaniedb3.db;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Odbor {

    @PrimaryKey(autoGenerate = true)
    public int OdborId;

    @ColumnInfo(name = "Odbor")
    public String nazovOdboru;


}
