import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  isFetching: boolean = false;
  students: Student[] = [];
  error = null;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.studentService.fetchStudents().subscribe(
      (studentsData) => {
        this.students = Object.values(studentsData);
        this.isFetching = false;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  addNewStudent() {
    this.router.navigate(['/forms-reactive']);
  }
}
