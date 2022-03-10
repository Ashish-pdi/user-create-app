"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let users = [
    {
        id: (0, uuid_1.v4)(),
        name: 'ashish',
        email: 'ashish@politicaldata.com',
        mobile: '9911950882',
        description: 'Fullstack',
    },
];
let UsersService = class UsersService {
    async createUser(createUserInput) {
        const newUser = Object.assign(Object.assign({}, createUserInput), { id: (0, uuid_1.v4)() });
        users.push(newUser);
        return newUser;
    }
    async deleteUser(id) {
        const userDelete = users.find((user) => user.id === id);
        if (userDelete) {
            users = users.filter((user) => user.id !== id);
            return userDelete;
        }
        return new Error('User Not found');
    }
    async updateUser(updateUserInput) {
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
    async findAll() {
        return users;
    }
    async find(id) {
        const user = users.find((user) => user.id === id);
        if (!user) {
            return new Error('User not found');
        }
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map