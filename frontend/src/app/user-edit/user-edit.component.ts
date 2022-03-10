import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_USER, UPDATE_USER } from 'src/_queries/user';
import { FormFields } from '../formFields';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  id: String = '';

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group(FormFields);
  }

  private userSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.userSubscription = this.apollo
        .watchQuery<any>({ query: GET_USER, variables: { id: params['id'] } })
        .valueChanges.subscribe(({ data }) => {
          this.userForm.setValue({
            name: data.user.name,
            email: data.user.email,
            mobile: data.user.mobile,
            description: data.user.description,
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobile() {
    return this.userForm.get('mobile');
  }

  get description() {
    return this.userForm.get('description');
  }

  update() {
    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: { ...this.userForm.value, id: this.id },
        refetchQueries: [{ query: GET_USER, variables: { id: this.id } }],
      })
      .subscribe(({ data }) => {
        this.router.navigate(['/all']);
      });
  }
}
