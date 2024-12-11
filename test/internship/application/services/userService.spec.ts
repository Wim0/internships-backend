import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/internship/application/services/userService';
import { IUserRepository } from 'src/internship/domain/interfaces/IUserRepository';
import { IOrganizationRepository } from 'src/internship/domain/interfaces/IOrganizationRepository';
import { IFacultyRepository } from 'src/internship/domain/interfaces/IFacultyRepository';
import { CreateUserDTO } from 'src/internship/application/models/createUserDTO';
import { UserEntity } from 'src/internship/domain/entities/userEntity';
import { OrganizationEntity } from 'src/internship/domain/entities/organizationEntity';
import { FacultyEntity } from 'src/internship/domain/entities/facultyEntity';
import TYPES from 'src/types';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;
  let userRepository: IUserRepository;
  let organizationRepository: IOrganizationRepository;
  let facultyRepository: IFacultyRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: TYPES.IUserRepository,
          useValue: {
            createUser: jest.fn(),
            findAllUsers: jest.fn(),
            findUserById: jest.fn(),
            findUserByEmail: jest.fn(),
            editUserById: jest.fn(),
            deleteUserById: jest.fn(),
          },
        },
        {
          provide: TYPES.IOrganizationRepository,
          useValue: {
            findOrganizationById: jest.fn(),
          },
        },
        {
          provide: TYPES.IFacultyRepository,
          useValue: {
            findFacultyById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>(TYPES.IUserRepository);
    organizationRepository = module.get<IOrganizationRepository>(
      TYPES.IOrganizationRepository,
    );
    facultyRepository = module.get<IFacultyRepository>(
      TYPES.IFacultyRepository,
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'Test User',
        lastName: 'User LastName',
        email: 'test@example.com',
        password: 'password',
        organizationId: 1,
        facultyId: 1,
        isAdmin: false,
        rol: 'user',
        isVerified: false,
        createdAt: undefined,
      };
      const userEntity = new UserEntity();
      userEntity.name = createUserDTO.name;
      userEntity.lastName = createUserDTO.lastName;
      userEntity.email = createUserDTO.email;
      userEntity.password = createUserDTO.password;
      userEntity.organizationId = createUserDTO.organizationId;
      userEntity.facultyId = createUserDTO.facultyId;
      userEntity.isAdmin = createUserDTO.isAdmin;
      userEntity.rol = createUserDTO.rol.toLocaleLowerCase();
      userEntity.isVerified = false;
      userEntity.createdAt = new Date('2024-12-11T06:40:16.054Z');

      jest.spyOn(userRepository, 'createUser').mockResolvedValue(userEntity);
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);
      jest
        .spyOn(organizationRepository, 'findOrganizationById')
        .mockResolvedValue(Promise.resolve(new OrganizationEntity()));
      jest
        .spyOn(facultyRepository, 'findFacultyById')
        .mockResolvedValue(Promise.resolve(new FacultyEntity()));

      const result = await service.createUser(createUserDTO);
      expect(result).toEqual(userEntity);
      expect(userRepository.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          facultyId: 1,
          lastName: 'User LastName',
          createdAt: expect.any(Date),
        }),
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const users = [new UserEntity(), new UserEntity()];
      jest.spyOn(userRepository, 'findAllUsers').mockResolvedValue(users);

      const result = await service.findAllUsers();
      expect(result).toEqual(users);
      expect(userRepository.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should return a user by id', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);

      const result = await service.findUserById(1);
      expect(result).toEqual(user);
      expect(userRepository.findUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('editUserById', () => {
    it('should edit a user by id', async () => {
      const userDTO: CreateUserDTO = {
        name: 'Updated User',
        lastName: 'Updated LastName',
        email: 'updated@example.com',
        password: 'password',
        organizationId: 1,
        facultyId: 1,
        isAdmin: false,
        rol: 'user',
        isVerified: false,
        createdAt: undefined,
      };
      const userEntity = new UserEntity();
      userEntity.name = userDTO.name;
      userEntity.lastName = userDTO.lastName;
      userEntity.email = userDTO.email;
      userEntity.password = userDTO.password;
      userEntity.organizationId = userDTO.organizationId;
      userEntity.facultyId = userDTO.facultyId;
      userEntity.isAdmin = userDTO.isAdmin;
      userEntity.rol = userDTO.rol.toLocaleLowerCase();
      userEntity.isVerified = false;
      userEntity.createdAt = new Date();

      jest.spyOn(userRepository, 'editUserById').mockResolvedValue(userEntity);

      const result = await service.editUserById(1, userDTO);
      expect(result).toEqual(userEntity);
      expect(userRepository.editUserById).toHaveBeenCalledWith(1, userDTO);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by id', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);
      jest.spyOn(userRepository, 'deleteUserById').mockResolvedValue(true);

      const result = await service.deleteUserById(1);
      expect(result).toEqual(true);
    });
  });
});
