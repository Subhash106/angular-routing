import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css'],
})
export class ReactiveFormsComponent implements OnInit {
  error = null;
  answer: string = '';
  signupForm: FormGroup;
  formSubmitted: boolean = false;
  genders: string[] = ['male', 'female'];
  defaultSecretOption: string = 'What is your first pet?';
  forbiddenUserNames: string[] = ['Chris', 'Anna'];

  user: {
    username: string;
    email: string;
    secret: string;
    answer: string;
    gender: string;
  } = { username: '', email: '', secret: '', answer: '', gender: '' };

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.errorSubject.subscribe((error: Error) => {
      this.error = error.message;
    });
    this.signupForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.forbiddenNames.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails.bind(this)
      ),
      secret: new FormControl('What is your first pet?'),
      answer: new FormControl(null),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }

  suggestUsername() {}

  onSubmit() {
    console.log(this.signupForm.value);
    this.studentService.createStudent(this.signupForm.value);
  }

  addHobby() {
    const hobby = new FormControl(null);

    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }

  goToAllStudents() {
    this.router.navigate(['/students']);
  }
}
