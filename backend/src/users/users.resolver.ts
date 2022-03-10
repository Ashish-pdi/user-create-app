import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  user(@Args('id') id: string): Promise<User | Error> {
    return this.usersService.find(id);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation((returns) => User)
  deleteUser(@Args('id') id: string): Promise<User | Error> {
    return this.usersService.deleteUser(id);
  }

  @Mutation((returns) => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User | Error> {
    return this.usersService.updateUser(updateUserInput);
  }
}
