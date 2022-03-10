import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './models/users.model';
export declare class UsersService {
    createUser(createUserInput: CreateUserInput): Promise<User>;
    deleteUser(id: string): Promise<User | Error>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User | Error>;
    findAll(): Promise<User[]>;
    find(id: string): Promise<User | Error>;
}
