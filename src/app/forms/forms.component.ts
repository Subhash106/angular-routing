import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  defaultSecretOption: string = 'What is your first pet?';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  formSubmitted: boolean = false;

  user: {
    username: string;
    email: string;
    secret: string;
    answer: string;
    gender: string;
  } = { username: '', email: '', secret: '', answer: '', gender: '' };

  constructor() {}

  ngOnInit(): void {}

  suggestUsername() {
    const username: string = 'Subash Chandra';
    this.signupForm.setValue({
      username: username,
      email: 's.chandra106@gmail.com',
      secret: 'What is your favorite fruit?',
      answer: 'Nelly',
      gender: 'male',
    });
  }

  onSubmit(form: NgForm) {
    console.log('Submitted', form);
    this.formSubmitted = true;
    this.user.username = this.signupForm.value.username;
    this.user.email = this.signupForm.value.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.answer;
    this.user.gender = this.signupForm.value.gender;
  }
}
