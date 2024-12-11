import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from '../entities/userEntity';

export interface IUserRepository {
  findAllUsers(): Promise<UserEntity[]>;
  findUserById(id: number): Promise<UserDTO>;
  findUserByEmail(email: string): Promise<UserDTO>;
  findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity>;
  createUser(user: UserEntity): Promise<UserEntity>;
  editUserById(userId: number, user: UserDTO): Promise<UserDTO>;
  deleteUserByid(userId: number): Promise<boolean>;
}
