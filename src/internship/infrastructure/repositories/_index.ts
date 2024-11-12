import TYPES from 'src/types';
//Services
import { UserService } from 'src/internship/application/services/userService';
//Repositories
import { UserRepository } from './userRepository';

export const providers = [
  {
    provide: TYPES.IUserService,
    useClass: UserService,
  },
  {
    provide: TYPES.IUserRepository,
    useClass: UserRepository,
  },
];
