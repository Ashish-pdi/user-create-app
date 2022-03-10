import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';

import { User } from './models/users.model';

let users: User[] = [
  {
    id: uuidv4(),
    name: 'ashish',
    email: 'ashish@politicaldata.com',
    mobile: '9911950882',
    description: 'Fullstack',
  },
];

@Injectable()
export class UsersService {
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser: User = { ...createUserInput, id: uuidv4() };

    users.push(newUser);

    return newUser;
  }

  async deleteUser(id: string): Promise<User | Error> {
    const userDelete = users.find((user) => user.id === id);

    if (userDelete) {
      users = users.filter((user) => user.id !== id);
      return userDelete;
    }

    return new Error('User Not found');
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User | Error> {
    const updateUser = users.find((user) => user.id === updateUserInput.id);

    if (updateUser) {
      updateUser.name = updateUserInput.name;
      updateUser.description = updateUserInput.description;
      updateUser.email = updateUserInput.email;
      updateUser.mobile = updateUserInput.mobile;

      return updateUser;
    }

    return new Error('User Not found');
  }

  async findAll(): Promise<User[]> {
    return users;
  }

  async find(id: string): Promise<User | Error> {
    const user = users.find((user) => user.id === id);

    if (!user) {
      return new Error('User not found');
    }
    return user;
  }
}
