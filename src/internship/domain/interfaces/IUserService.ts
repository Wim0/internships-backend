import { UserEntity } from '../../domain/entities/userEntity';
import { CreateUserDTO } from '../../application/models/createUserDTO';
import { UserDTO } from '../../application/models/userDTO';

export interface IUserService {
  createUser(createUserDTO: CreateUserDTO): Promise<UserEntity>;
  findAllUsers(): Promise<UserDTO[]>;
  findUserById(id: number): Promise<UserDTO>;
  editUserById(id: number, user: UserEntity): Promise<UserDTO>;
  deleteUserById(id: number): Promise<boolean>;
}
