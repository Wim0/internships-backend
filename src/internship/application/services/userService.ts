import { UserEntity } from '../../domain/entities/userEntity';
import TYPES from '../../../types';
import { JwtService } from '@nestjs/jwt';
//Packages
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//DTOs
import { UserDTO } from '../../application/models/userDTO';
import { CreateUserDTO } from '../../application/models/createUserDTO';
import { LoginUserDTO } from '../../application/models/loginUserDTO';
//Interfaces
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUserService } from '../../domain/interfaces/IUserService';
import { IOrganizationRepository } from '../../domain/interfaces/IOrganizationRepository';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';

@Injectable()
export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  private readonly _organizationRepository: IOrganizationRepository;
  private readonly _facultyRepository: IFacultyRepository;
  private readonly jwtService: JwtService;

  constructor(
    @Inject(TYPES.IUserRepository)
    userRepository: IUserRepository,
    @Inject(TYPES.IOrganizationRepository)
    organizationRepository: IOrganizationRepository,
    @Inject(TYPES.IFacultyRepository)
    facultyRepository: IFacultyRepository,
    jwtService: JwtService, // Asegúrate de que JwtService esté inyectado aquí
  ) {
    this._userRepository = userRepository;
    this._organizationRepository = organizationRepository;
    this._facultyRepository = facultyRepository;
    this.jwtService = jwtService; // Asigna jwtService al campo de clase
  }

  async login(loginUserDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    const user = await this._userRepository.findUserByEmailAndPassword(
      loginUserDTO.email,
      loginUserDTO.password,
    );
    if (!user || user.password !== loginUserDTO.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      rol: user.rol,
      organizationId: user.organizationId,
      facultyId: user.facultyId,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    try {
      const currentDate = new Date();

      const user = new UserEntity();
      user.name = createUserDTO.name;
      user.lastName = createUserDTO.lastName;
      user.email = createUserDTO.email;
      user.password = createUserDTO.password;
      user.organizationId = createUserDTO.organizationId
        ? createUserDTO.organizationId
        : null;
      user.facultyId = createUserDTO.facultyId ? createUserDTO.facultyId : null;
      user.isAdmin = createUserDTO.isAdmin ? true : false;
      user.rol = createUserDTO.rol.toLocaleLowerCase();
      user.isVerified = true;
      user.createdAt = currentDate;

      // Verifica si la organización y la facultad existen
      if (user.organizationId) {
        const organization =
          await this._organizationRepository.findOrganizationById(
            user.organizationId,
          );
        if (!organization) {
          throw new NotFoundException('Organization not found');
        }
      }

      if (user.facultyId) {
        const faculty = await this._facultyRepository.findFacultyById(
          user.facultyId,
        );
        if (!faculty) {
          throw new NotFoundException('Faculty not found');
        }
      }

      const userAlreadyExists = await this._userRepository.findUserByEmail(
        createUserDTO.email,
      );
      if (userAlreadyExists) {
        console.log('User already exists');
        throw new ConflictException('User with this email already exists');
      }

      const userCreated = await this._userRepository.createUser(user);
      if (!userCreated) {
        console.log('User not created');
        throw new NotFoundException();
      }

      return userCreated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllUsers(): Promise<UserDTO[]> {
    const users = await this._userRepository.findAllUsers();
    if (!users) {
      throw new NotFoundException();
    }
    const userList = users.map((user) => {
      const userDTO = new UserDTO();
      userDTO.id = user.id;
      userDTO.name = user.name;
      userDTO.lastName = user.lastName;
      userDTO.email = user.email;
      userDTO.organizationId = user.organizationId;
      userDTO.facultyId = user.facultyId;
      userDTO.isAdmin = user.isAdmin;
      userDTO.rol = user.rol;
      userDTO.isVerified = user.isVerified;
      return userDTO;
    });

    return userList;
  }

  async findUserById(id: number): Promise<UserDTO> {
    const user = await this._userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    const userFound = new UserDTO();
    userFound.id = user.id;
    userFound.name = user.name;
    userFound.lastName = user.lastName;
    userFound.email = user.email;
    userFound.organizationId = user.organizationId;
    userFound.facultyId = user.facultyId;

    return userFound;
  }

  async editUserById(id: number, user: UserDTO): Promise<UserDTO> {
    const userEdited = await this._userRepository.editUserById(id, user);
    if (!userEdited) {
      throw new NotFoundException();
    }
    return userEdited;
  }

  async deleteUserById(id: number): Promise<boolean> {
    const user = await this._userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this._userRepository.deleteUserById(user.id);
  }
}
