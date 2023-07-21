package com.example.zadaniedb3;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.zadaniedb3.db.Students;
import com.example.zadaniedb3.viewmodel.ShowStudentsActivityViewModel;

import java.util.List;

public class StudentsListActivity extends AppCompatActivity implements StudentsListAdapter.HandleSingleStudentClick{

    int odborId;
    StudentsListAdapter studentsListAdapter;
    ShowStudentsActivityViewModel viewModel;
    RecyclerView recyclerView;
    Students studentsToUpdate = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_students_list);

        odborId = getIntent().getIntExtra("odborId", 0);
        String nazovOdboru = getIntent().getStringExtra("nazovOdboru" );

        EditText addNewStudent = findViewById(R.id.newStudent);
        Button save = findViewById(R.id.saveStudent);

        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String studentName =  addNewStudent.getText().toString();
                if(TextUtils.isEmpty(studentName)){
                    Toast.makeText(StudentsListActivity.this, "zadajte meno studenta",Toast.LENGTH_SHORT);
                    return;
                }
                if(studentsToUpdate == null){
                    saveNewStudent(studentName);
                }else{
                    updateNewStudent(studentName);
                }
            }
        });

        initViewModel();
        initRecyclerStudent();
        viewModel.getAllStudentsList(odborId);
    }


    public void initViewModel(){
        viewModel = new ViewModelProvider(this).get(ShowStudentsActivityViewModel.class);
        viewModel.getStudentsListObserver().observe(this, new Observer<List<Students>>() {
            @Override
            public void onChanged(List<Students> students) {
                if(students == null ){
                    recyclerView.setVisibility(View.GONE);
                    findViewById(R.id.emptyStudent).setVisibility(View.VISIBLE);
                }else{
                    studentsListAdapter.setOdborList(students);
                    findViewById(R.id.emptyStudent).setVisibility(View.GONE);
                    recyclerView.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    public void initRecyclerStudent(){
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        studentsListAdapter = new StudentsListAdapter(this,this );
        recyclerView.setAdapter(studentsListAdapter);


    }

    public void saveNewStudent(String studentName){
        Students student = new Students();
        student.meno = studentName;
        student.odborId = odborId;
        viewModel.insertStudent(student);
        ((EditText)findViewById(R.id.newStudent)).setText("");
    }

    @Override
    public void odstranitStudent(Students student) {
        viewModel.deleteStudent(student);
    }

    @Override
    public void upravitStudent(Students student) {
        this.studentsToUpdate = student;
        ((EditText) findViewById(R.id.newStudent)).setText(student.meno);
    }

    void updateNewStudent(String newName){
        studentsToUpdate.meno = newName;
        viewModel.updateStudent(studentsToUpdate);
        ((EditText) findViewById(R.id.newStudent)).setText("");
        studentsToUpdate = null;
    }
}