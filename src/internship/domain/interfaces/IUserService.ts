import { UserEntity } from '../../domain/entities/userEntity';
import { CreateUserDTO } from '../../application/models/createUserDTO';
import { LoginUserDTO } from '../../application/models/loginUserDTO';
import { UserDTO } from '../../application/models/userDTO';

export interface IUserService {
  login(loginUserDTO: LoginUserDTO): Promise<{ accessToken: string }>;
  createUser(createUserDTO: CreateUserDTO): Promise<UserEntity>;
  findAllUsers(): Promise<UserDTO[]>;
  findUserById(id: number): Promise<UserDTO>;
  editUserById(id: number, user: UserEntity): Promise<UserDTO>;
  deleteUserById(id: number): Promise<boolean>;
}
