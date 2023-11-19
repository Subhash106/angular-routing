import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}

  createStudent(studentData: Student) {
    this.http
      .post(
        'https://food-order-app-e5c31-default-rtdb.firebaseio.com/students.json',
        studentData
      )
      .subscribe((data) => {
        console.log('data', data);
      });
  }

  fetchStudents() {
    return this.http.get(
      'https://food-order-app-e5c31-default-rtdb.firebaseio.com/students.json'
    );
  }
}
