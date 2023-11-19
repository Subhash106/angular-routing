import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  errorSubject = new Subject();

  constructor(private http: HttpClient) {}

  createStudent(studentData: Student) {
    this.http
      .post(
        'https://food-order-app-e5c31-default-rtdb.firebaseio.com/students.jso',
        studentData
      )
      .subscribe(
        (data) => {
          console.log('data', data);
        },
        (error) => {
          this.errorSubject.next(error);
        }
      );
  }

  fetchStudents() {
    return this.http.get(
      'https://food-order-app-e5c31-default-rtdb.firebaseio.com/students.json'
    );
  }
}
