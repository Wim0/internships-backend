import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from '../entities/userEntity';

export interface IAdminRepository {
  findAllAdmins(): Promise<UserEntity[]>;
  editAdminById(userId: number, user: UserEntity): Promise<UserDTO>;
  deactivateAdminById(userId: number): Promise<boolean>;
}
