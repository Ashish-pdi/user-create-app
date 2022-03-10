import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { DELETE_USER, GET_USERS } from 'src/_queries/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  users: any[] = [];

  private usersSubscription: Subscription = new Subscription();

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.usersSubscription = this.apollo
      .watchQuery<any>({ query: GET_USERS })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.users = data.users;
      });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  deleteUser(id: String) {
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: { id },
        refetchQueries: [{ query: GET_USERS }],
      })
      .subscribe();
  }

  goToCreate() {
    this.router.navigate(['/'], { state: { name: 'please create user' } });
  }

  goToEdit(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
}
