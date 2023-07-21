package com.example.klikacka;

import android.content.Context;
import android.content.Intent;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.os.CountDownTimer;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import java.util.Random;

public class DrawView extends View {
    private int randomX;
    private int randomY;
    private int radius;
    int skore;

    int zivot = 10;

    public DrawView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        radius = 100;
    }

    @Override
    public boolean onTouchEvent(MotionEvent motionEvent) {

        int event = motionEvent.getAction();
        if (event == MotionEvent.ACTION_DOWN) {
            float touchX = motionEvent.getX();
            float touchY = motionEvent.getY();

            if(isIntersecting(touchX,touchY)){
                if(radius > 20){
                    radius -= 5;
                }
                if(radius <= 30){
                    radius = 80;
                }
                skore = skore + 2;
                postInvalidate();
                return true;
            }
            zivot--;
            skore = skore - 1;
            if(zivot <= 0){
                Toast.makeText(getContext(), "Prehral si !!!!!!!!!! \nTvoje Skore: "+ skore, Toast.LENGTH_LONG).show();
                zivot = 10;
                skore = 0;
                radius = 100;
            }
            postInvalidate();

        }
        return false;
    }



    @Override
    protected void onDraw(Canvas canvas) {

        Paint black = new Paint();
        black.setColor(Color.BLACK);
        black.setTextSize(30);

        int r = new Random().nextInt(230);
        int g = new Random().nextInt(230);
        int b = new Random().nextInt(230);
        canvas.drawText("skore: " + skore, getWidth()/2 - 40, 100, black);

        canvas.drawText("ZIVOT: " + zivot, getWidth()/2 - 40, getHeight() - 40, black);
        randomX = new Random().nextInt(getWidth() - 3*radius-20) + radius;
        randomY = new Random().nextInt(getHeight() - 3*radius-20) + radius;

        Paint paint = new Paint();
        paint.setColor(Color.rgb(r,g,b));

        canvas.drawCircle(randomX,randomY,radius,paint);
        canvas.drawText("Velkost Kruhu: " + String.valueOf(radius),50,50, black);
    }

    private boolean isIntersecting(float touchX, float touchY){
        if(Math.sqrt((randomX - touchX)*(randomX - touchX)+(randomY - touchY)*(randomY - touchY)) <= radius){
            return true;
        }
        return false;
    }
}