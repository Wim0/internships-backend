import TYPES from 'src/types';
//Services
import { UserService } from 'src/internship/application/services/userService';
import { OrganizationService } from 'src/internship/application/services/organizationService';
import { FacultyService } from 'src/internship/application/services/facultyService';
import { AdminService } from 'src/internship/application/services/adminService';
import { PracticeService } from 'src/internship/application/services/practiceService';
//Repositories
import { UserRepository } from './userRepository';
import { OrganizationRepository } from './organizationRepository';
import { FacultyRepository } from './facultyRepository';
import { AdminRepository } from './adminRepository';
import { PracticeRepository } from './practiceRepository';

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
  {
    provide: TYPES.IFacultyService,
    useClass: FacultyService,
  },
  {
    provide: TYPES.IFacultyRepository,
    useClass: FacultyRepository,
  },
  {
    provide: TYPES.IAdminService,
    useClass: AdminService,
  },
  {
    provide: TYPES.IAdminRepository,
    useClass: AdminRepository,
  },
  {
    provide: TYPES.IPracticeService,
    useClass: PracticeService,
  },
  {
    provide: TYPES.IPracticeRepository,
    useClass: PracticeRepository,
  },
];
