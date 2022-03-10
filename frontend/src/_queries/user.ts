import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      name
      email
      mobile
      description
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $id: String!
    $name: String!
    $email: String!
    $mobile: String!
    $description: String
  ) {
    updateUser(
      updateUserInput: {
        id: $id
        name: $name
        email: $email
        mobile: $mobile
        description: $description
      }
    ) {
      name
      email
      mobile
      description
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $mobile: String!
    $description: String
  ) {
    createUser(
      createUserInput: {
        name: $name
        email: $email
        mobile: $mobile
        description: $description
      }
    ) {
      name
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      name
      id
    }
  }
`;
