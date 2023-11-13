import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;
  isActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });

    this.userService.activateUser.subscribe((data: boolean) => {
      this.isActive = data;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  activateUser() {
    this.userService.activateUser.next(true);
  }

  onDeactivate() {
    this.userService.activateUser.next(false);
  }
}
