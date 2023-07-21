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

import java.util.List;

public class OdborListAdapter extends RecyclerView.Adapter<OdborListAdapter.MyViewHolder> {

    Context context;
    List<Odbor> odborList;
    public HandleSingleItemClick click;

    public OdborListAdapter(Context context, HandleSingleItemClick click){
        this.context = context;
        this.click = click;
    }

    public void setOdborList(List<Odbor> odbors){
        this.odborList = odbors;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public OdborListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_row, parent,false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull OdborListAdapter.MyViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.displayOdborName.setText(this.odborList.get(position).nazovOdboru);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                click.itemClick(odborList.get(position));
            }
        });

        holder.update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                click.upravitOdbor(odborList.get(position));
            }
        });

        holder.remove.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
            click.odstranitOdbor(odborList.get(position));
            }
        });
    }

    @Override
    public int getItemCount() {
        if(odborList == null || odborList.size() == 0){
            return 0;
        }else{
            return odborList.size();
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

    public interface HandleSingleItemClick{
        void itemClick(Odbor odbor);
        void odstranitOdbor(Odbor odbor);
        void upravitOdbor(Odbor odbor);
    }
}
