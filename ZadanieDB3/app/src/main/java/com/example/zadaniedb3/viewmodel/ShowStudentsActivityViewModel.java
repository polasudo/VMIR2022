package com.example.zadaniedb3.viewmodel;

import android.app.Application;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.zadaniedb3.db.AppDatabase;
import com.example.zadaniedb3.db.Odbor;
import com.example.zadaniedb3.db.Students;

import java.util.List;

public class ShowStudentsActivityViewModel extends AndroidViewModel {

    private MutableLiveData<List<Students>> listOfStudents;
    public AppDatabase appDatabase;

    public ShowStudentsActivityViewModel(Application application){
        super(application);
        listOfStudents = new MutableLiveData<>();

        appDatabase = appDatabase.getDBinstance(getApplication().getApplicationContext());
    }

    public MutableLiveData<List<Students>> getStudentsListObserver(){
        return listOfStudents;
    }

    public void getAllStudentsList(int odborId){
        List<Students> studentList =  appDatabase.schoolDao().getAllStudentsList(odborId);
        if(studentList.size()>0){
            listOfStudents.postValue(studentList);
        }else {
            listOfStudents.postValue(null);
        }
    }

    public void insertStudent(Students student){
        appDatabase.schoolDao().insertStudents(student);
        getAllStudentsList(student.odborId);
    }

    public void updateStudent(Students student){
        appDatabase.schoolDao().updateStudents(student);
        getAllStudentsList(student.odborId);
    }

    public void deleteStudent(Students student){
        appDatabase.schoolDao().deleteStudents(student);
        getAllStudentsList(student.odborId);
    }
}
