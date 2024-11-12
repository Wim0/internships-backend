import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from '../entities/userEntity';

export interface IUserRepository {
  findAllUsersAsync(): Promise<UserEntity[]>;
  findUserByIdAsync(id: number): Promise<UserEntity>;
  createUserAsync(user: UserEntity): Promise<UserEntity>;
  editUserAsync(userId: number, user: UserEntity): Promise<UserDTO>;
  deleteUserAsync(userId: number): Promise<boolean>;
}
