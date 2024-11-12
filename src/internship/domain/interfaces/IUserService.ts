import { UserEntity } from '../../domain/entities/userEntity';
import { CreateUserDTO } from '../../application/models/createUserDTO';
import { UserDTO } from '../../application/models/userDTO';

export interface IUserService {
  create(createUserDTO: CreateUserDTO): Promise<UserEntity>;
  findAll(): Promise<UserDTO[]>;
  findOne(id: number): Promise<UserDTO>;
  edit(id: number, user: UserEntity): Promise<UserDTO>;
  delete(id: number): Promise<boolean>;
}
