package com.example.zadaniedb3;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.zadaniedb3.db.Odbor;
import com.example.zadaniedb3.db.Students;

import java.util.List;

public class StudentsListAdapter extends RecyclerView.Adapter<StudentsListAdapter.MyViewHolder> {

    Context context;
    List<Students> studentsList;
    public HandleSingleStudentClick click;

    public StudentsListAdapter(Context context, HandleSingleStudentClick click){
        this.context = context;
        this.click = click;
    }

    public void setOdborList(List<Students> studentsList){
        this.studentsList = studentsList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public StudentsListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_row, parent,false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StudentsListAdapter.MyViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.displayOdborName.setText(this.studentsList.get(position).meno);

        holder.update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                click.upravitStudent(studentsList.get(position));
            }
        });

        holder.remove.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
            click.odstranitStudent(studentsList.get(position));
            }
        });

    }

    @Override
    public int getItemCount() {
        if(studentsList == null || studentsList.size() == 0){
            return 0;
        }else{
            return studentsList.size();
        }
    }

    public class MyViewHolder extends RecyclerView.ViewHolder{
        TextView displayOdborName;
        Button update;
        Button remove;
        public MyViewHolder(View view){
            super(view);
            displayOdborName = view.findViewById(R.id.displayOdborName);
            update = view.findViewById(R.id.update);
            remove = view.findViewById(R.id.remove);

        }
    }

    public interface HandleSingleStudentClick{
        void odstranitStudent(Students student);
        void upravitStudent(Students student);
    }
}
