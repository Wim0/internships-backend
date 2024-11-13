import TYPES from 'src/types';
//Services
import { UserService } from 'src/internship/application/services/userService';
import { OrganizationService } from 'src/internship/application/services/organizationService';
//Repositories
import { UserRepository } from './userRepository';
import { OrganizationRepository } from './organizationRepository';

export const providers = [
  {
    provide: TYPES.IUserService,
    useClass: UserService,
  },
  {
    provide: TYPES.IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: TYPES.IOrganizationService,
    useClass: OrganizationService,
  },
  {
    provide: TYPES.IOrganizationRepository,
    useClass: OrganizationRepository,
  },
];
