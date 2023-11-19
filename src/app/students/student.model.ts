export interface Student {
  username: string;
  email: string;
  secret: string;
  answer: string;
  gender: 'male' | 'female';
  hobbies: string[];
}
