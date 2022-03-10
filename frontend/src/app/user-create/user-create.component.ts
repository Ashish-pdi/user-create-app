import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CREATE_USER, GET_USERS } from 'src/_queries/user';
import { FormFields } from '../formFields';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group(FormFields);
  }

  ngOnInit(): void {}

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

  save() {
    this.apollo
      .mutate({
        mutation: CREATE_USER,
        refetchQueries: [{ query: GET_USERS }],
        variables: {
          ...this.userForm.value,
        },
      })
      .subscribe(({ data }) => {
        this.router.navigate(['/all'], { state: (data as any).createUser });
      });
  }
}
