package com.example.zadaniedb3.db;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface SchoolDao {
    @Query("Select * from Odbor")
    List<Odbor> getAllOdborsList();

    @Insert
    void insertOdbor(Odbor...odbors);

    @Update
    void updateOdbor(Odbor odbor);

    @Delete
    void deleteOdbor(Odbor odbor);

    @Query("Select * from Students where OdborId = :odbId")
    List<Students> getAllStudentsList(int odbId);

    @Insert
    void insertStudents(Students students);

    @Update
    void updateStudents(Students students);

    @Delete
    void deleteStudents(Students students);
}
