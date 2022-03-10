import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './models/users.model';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    users(): Promise<User[]>;
    user(id: string): Promise<User | Error>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    deleteUser(id: string): Promise<User | Error>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User | Error>;
}
