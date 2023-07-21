package com.example.gpsvmir;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentActivity;

import android.os.Bundle;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.example.gpsvmir.databinding.ActivityMapsBinding;

import android.graphics.Color;
import android.location.Location;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.Toast;

import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;

import java.util.ArrayList;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    GoogleMap gMap;
    SeekBar seekWidth;
    Button btdraw, btClear;

    Polyline polyline = null;
    ArrayList<Marker> markerList = new ArrayList<>();
    ArrayList<Polyline> polylineArrayList = new ArrayList<>();
    ArrayList<Marker> pomocnik = new ArrayList<>();

    //    List<LatLng> latLngList = new ArrayList<>();
//    ArrayList<Marker> pomocna = new ArrayList<>();
    int markers = 0;
    int x = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMapsBinding binding = ActivityMapsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());


//        seekWidth = findViewById(R.id.seek_width);
        btdraw = findViewById(R.id.bt_draw);
        btClear = findViewById(R.id.bt_clear);



        SupportMapFragment supportMapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.google_map);
        supportMapFragment.getMapAsync(this);

        btdraw.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                setWidth();
                draw();
            }
            //vykreslit polyline tak aby mi vykreslilo najkratsiu trasu
        });

        btClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(markers<1){
                    Toast.makeText(getApplicationContext(),"Nemas co zmazat", Toast.LENGTH_LONG).show();
                }
                else{
                    remove();
                }

            }
        });
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        gMap = googleMap;
        gMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng latLng) {
                if (markers < 10) {
                    markers = markers + 1;
                    Marker marker = gMap.addMarker(new MarkerOptions().position(latLng));
                    markerList.add(marker);

                    if (markerList.size() > 1) {
                        x = x + 1;
                        LatLng marker1 = markerList.get(x - 1).getPosition();
                        LatLng marker2 = markerList.get(x).getPosition();

                        Polyline polylineOptions = gMap.addPolyline(new PolylineOptions()
                                .add(new LatLng(marker1.latitude, marker1.longitude), new LatLng(marker2.latitude, marker2.longitude))
                                .width(3)
                                .color(Color.BLACK));
                        polylineArrayList.add(polylineOptions);
                    }
                    if (markerList.size() > 10) {
                        markerList.get(0).remove();
                        markerList.remove(0);
//                      latLngList.get(0);

                        //pri kazdom vytvoreni markra si ho vytvorim ako location a nasledne si z toho markra vyberam latitude a longitude
//                        latLngList.remove(0);
                        polyline.remove();
                    }
                }
            }
        });
    }

    private void remove(){
//                polyline.remove();
//                markerList.get(markerList.size()-1).remove();
//                markerList.remove(markerList.size()-1);
//                latLngList.remove(latLngList.size()-1);
//                latLngList.remove(latLngList.size()-1);
//                PolylineOptions polylineOptions = new PolylineOptions()
//                        .addAll(latLngList).clickable(true);
//                polyline = gMap.addPolyline(polylineOptions);
        markerList.get(markerList.size()-1).remove();
        markerList.remove(markerList.size()-1);
        markers = markers -1;
        polylineArrayList.get(polylineArrayList.size()-1).remove();
        polylineArrayList.remove(polylineArrayList.size()-1);
        if(x >0) {
            x = x - 1;
        }
//        if(polylineArrayList.size()>0){
//            polylineArrayList.get(polylineArrayList.size()-1).remove();
//            polylineArrayList.remove(polylineArrayList.size()-1);
//            seekWidth.setProgress(3);
//        }
    }

//    private void setWidth() {
//        seekWidth.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
//            @Override
//            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
//                int width = seekWidth.getProgress();
//                if(polyline != null) {
//                    polyline.setWidth(width);
//                }
//            }
//
//            @Override
//            public void onStartTrackingTouch(SeekBar seekBar) {
//
//            }
//
//            @Override
//            public void onStopTrackingTouch(SeekBar seekBar) {
//
//            }
//        });
//    }
//
    private void draw() {
        for (int i = 0; i < polylineArrayList.size(); i++) {
            polylineArrayList.get(i).remove();
        }


        float[] distance = new float[1];

        int inter = 0;

        if(markerList.size() % 2 == 0){
        for(int i = markerList.size(); i >= 0; i--) {
            float minDistance = Float.MAX_VALUE;
            pomocnik.add(markerList.get(inter));
            LatLng iMarker = markerList.get(inter).getPosition();//prvy marker berieme a pridame ho do pomocnika
            for (int j = 0; j < markerList.size(); j++) {           // a teraz ho porovnavame s kazdym dalsim
                LatLng jMarker = markerList.get(j).getPosition();
                if(!pomocnik.contains(markerList.get(j))) {         //ak uz je v pomocnikovi tak nech sa to skipne
                    Location.distanceBetween(iMarker.latitude, iMarker.longitude, jMarker.latitude, jMarker.longitude, distance);
                        if (distance[0] < minDistance) {
                            minDistance = distance[0];
                            inter = j;
                        }
                }
            }

        }
        }
        else
        {
//            inter = markerList.size()-1;
            for(int i = 0; i < markerList.size(); i++) {
            float minDistance = Float.MAX_VALUE;
            pomocnik.add(markerList.get(inter));
            LatLng iMarker = markerList.get(inter).getPosition();//prvy marker berieme a pridame ho do pomocnika
            for (int j = 0; j < markerList.size(); j++) {           // a teraz ho porovnavame s kazdym dalsim
                LatLng jMarker = markerList.get(j).getPosition();
                if(!pomocnik.contains(markerList.get(j))) {         //ak uz je v pomocnikovi tak nech sa to skipne
                    Location.distanceBetween(iMarker.latitude, iMarker.longitude, jMarker.latitude, jMarker.longitude, distance);
                    if (distance[0] < minDistance) {
                        minDistance = distance[0];
                        inter = j;
                    }
                }
            }

        }
        }
        for(int i = 0; i< pomocnik.size()-1; i++){
            LatLng iMarker = pomocnik.get(i).getPosition();
            LatLng closestMarker = pomocnik.get(i+1).getPosition();
            Polyline line = gMap.addPolyline(new PolylineOptions()
                    .add(new LatLng(iMarker.latitude, iMarker.longitude),new LatLng(closestMarker.latitude, closestMarker.longitude))
                    .width(5)
                    .color(Color.RED));
            polylineArrayList.add(line);
        }
        pomocnik.clear();
    }
}