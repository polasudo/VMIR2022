package com.example.zadaniedb3;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.zadaniedb3.db.Odbor;
import com.example.zadaniedb3.viewmodel.MainActivityViewModel;

import java.util.List;

public class MainActivity extends AppCompatActivity implements OdborListAdapter.HandleSingleItemClick {

    public MainActivityViewModel viewModel;
    TextView prazdne;
    RecyclerView recycler;
    public OdborListAdapter odborListAdapter;
    Odbor odborEdit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        prazdne = findViewById(R.id.prazdne);
        recycler = findViewById(R.id.recyclerView);
        Button add = findViewById(R.id.addNewOdbor);

        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAddDialog(false);
            }
        });

        initView();
        initRecycler();
        viewModel.getAllOdborList();
    }

    public void initRecycler(){
        recycler.setLayoutManager(new LinearLayoutManager(this));
        odborListAdapter = new OdborListAdapter(this,this);
        recycler.setAdapter(odborListAdapter);
    }

    private void initView(){
        viewModel = new ViewModelProvider(this).get(MainActivityViewModel.class);
        viewModel.getOdborListObserver().observe(this, new Observer<List<Odbor>>() {
            @Override
            public void onChanged(List<Odbor> odbors) {
                if(odbors == null){
                prazdne.setVisibility(View.VISIBLE);
                recycler.setVisibility(View.GONE);
                }else {
                    odborListAdapter.setOdborList(odbors);
                    recycler.setVisibility(View.VISIBLE);
                    prazdne.setVisibility(View.GONE);
                }
            }
        });
    }

    private void showAddDialog(boolean edit){
        AlertDialog dialogBuilder = new AlertDialog.Builder(this).create();
        View dialogView = getLayoutInflater().inflate( R.layout.adding_layout , null);
        EditText zapisOdbor =  dialogView.findViewById(R.id.zapisOdbor);
        TextView vytvoritOdbor =  dialogView.findViewById(R.id.vytvorit);
        TextView zrusitOdbor =  dialogView.findViewById(R.id.zrusit);

        if(edit){
            vytvoritOdbor.setText("upravit");
            zapisOdbor.setText(odborEdit.nazovOdboru);
        }

        zrusitOdbor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialogBuilder.dismiss();
            }
        });
        vytvoritOdbor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String odbor = zapisOdbor.getText().toString();
                if(TextUtils.isEmpty(odbor)){
                    Toast.makeText(MainActivity.this,"musite zadat odbor",Toast.LENGTH_SHORT).show();
                    return;
                }

                if(edit){
                    odborEdit.nazovOdboru = odbor;
                    viewModel.updateOdbor(odborEdit);
                }else{
                    viewModel.insertOdbor(odbor);
                }

                dialogBuilder.dismiss();
            }
        });
        dialogBuilder.setView(dialogView);
        dialogBuilder.show();
    }

    @Override
    public void itemClick(Odbor odbor) {
        Intent intent = new Intent(MainActivity.this, StudentsListActivity.class);
        intent.putExtra("odborId", odbor.OdborId);
        intent.putExtra("nazovOdboru", odbor.nazovOdboru);
        startActivity(intent);
    }

    @Override
    public void odstranitOdbor(Odbor odbor) {
        viewModel.deleteOdbor(odbor);
    }

    @Override
    public void upravitOdbor(Odbor odbor) {
        this.odborEdit = odbor;
        showAddDialog(true);
    }
}