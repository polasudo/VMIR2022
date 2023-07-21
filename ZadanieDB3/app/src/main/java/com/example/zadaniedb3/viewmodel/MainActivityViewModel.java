package com.example.zadaniedb3.viewmodel;

import android.app.Application;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.example.zadaniedb3.db.AppDatabase;
import com.example.zadaniedb3.db.Odbor;

import java.util.List;

public class MainActivityViewModel extends AndroidViewModel {

    private MutableLiveData<List<Odbor>> listOfOdborov;
    public AppDatabase appDatabase;

    public MainActivityViewModel(Application application){
        super(application);
        listOfOdborov = new MutableLiveData<>();

        appDatabase = appDatabase.getDBinstance(getApplication().getApplicationContext());
    }

    public MutableLiveData<List<Odbor>> getOdborListObserver(){
        return listOfOdborov;
    }

    public void getAllOdborList(){
        List<Odbor> odborList =  appDatabase.schoolDao().getAllOdborsList();
        if(odborList.size()>0){
            listOfOdborov.postValue(odborList);
        }else {
            listOfOdborov.postValue(null);
        }
    }

    public void insertOdbor(String odborName){
        Odbor odbor = new Odbor();
        odbor.nazovOdboru = odborName;
        appDatabase.schoolDao().insertOdbor(odbor);
        getAllOdborList();
    }

    public void updateOdbor(Odbor odbor){
        appDatabase.schoolDao().updateOdbor(odbor);
        getAllOdborList();
    }

    public void deleteOdbor(Odbor odbor){
        appDatabase.schoolDao().deleteOdbor(odbor);
        getAllOdborList();
    }
}
