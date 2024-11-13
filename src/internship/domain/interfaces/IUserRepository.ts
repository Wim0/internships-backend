import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from '../entities/userEntity';

export interface IUserRepository {
  findAllUsers(): Promise<UserEntity[]>;
  findUserById(id: number): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserDTO>;
  createUser(user: UserEntity): Promise<UserEntity>;
  editUserById(userId: number, user: UserEntity): Promise<UserDTO>;
  deleteUserByid(userId: number): Promise<boolean>;
}
