package com.example.klikacka;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

//    TextView cas;
//    Button start;
//    DrawView klik;
//
//    CountDownTimer timer;

//    int t= 30;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        cas = (TextView)findViewById(R.id.cas);
//        start = (Button)findViewById(R.id.start);
//        klik = (DrawView) findViewById(R.id.klik);
//
//        start.setEnabled(true);
//        klik.setEnabled(false);
//
//        timer = new CountDownTimer(30000,1000) {
//            @Override
//            public void onTick(long l) {
//                t--;
//                cas.setText("Time: " + t);
//            }
//
//            @Override
//            public void onFinish() {
//                start.setEnabled(true);
//                klik.setEnabled(false);
//            }
//        };
//
//        start.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                timer.start();
//                klik.setEnabled(true);
//                start.setEnabled(false);
//                t=30;
//                cas.setText("Time: " + t);
//            }
//        });
//
    }
}