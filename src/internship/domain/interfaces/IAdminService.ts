import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from '../entities/userEntity';

export interface IAdminService {
  findAllAdmins(): Promise<UserDTO[]>;
  editAdminById(id: number, user: UserEntity): Promise<UserDTO>;
  deactivateAdminById(id: number): Promise<boolean>;
}
