import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe((count) => {
    //   console.log('count', count);
    // });

    const customIntervalObservable = new Observable((subscriber) => {
      let count: number = 0;
      setInterval(() => {
        subscriber.next(count);

        if (count > 2) {
          subscriber.complete();
        }

        if (count > 3) {
          subscriber.error(new Error('Something went wrong!'));
        }
        count++;
      }, 1000);
    });

    this.intervalSubscription = customIntervalObservable.subscribe(
      (count: number) => {
        console.log('count', count);
      },
      (error: Error) => {
        console.log(error.message);
      },
      () => {
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  loadServers(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: '1' },
      fragment: 'loading',
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
