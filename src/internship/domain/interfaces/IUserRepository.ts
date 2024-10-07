import { UserEntity } from '../entities/userEntity';

export interface IUserRepository {
  findAllUsersAsync(): Promise<UserEntity[]>;
  findUserByIdAsync(id: number): Promise<UserEntity>;
  createUserAsync(user: UserEntity): Promise<void>;
  editUserAsync(userId: number, user: UserEntity): Promise<void>;
  deleteUserAsync(userId: number): Promise<void>;
}
