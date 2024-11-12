import { UserEntity } from '../../domain/entities/userEntity';
import TYPES from '../../../types';
//Packages
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//DTOs
import { UserDTO } from '../../application/models/userDTO';
import { CreateUserDTO } from '../../application/models/createUserDTO';
//Interfaces
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUserService } from '../../domain/interfaces/IUserService';

@Injectable()
export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;

  constructor(@Inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    try {
      const user = new UserEntity();
      user.name = createUserDTO.name;
      user.email = createUserDTO.email;
      user.password = createUserDTO.password;

      const userCreated = await this._userRepository.createUserAsync(user);
      if (!userCreated) {
        throw new NotFoundException();
      }

      return userCreated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this._userRepository.findAllUsersAsync();
    if (!users) {
      throw new NotFoundException();
    }
    const userList = users.map((user) => {
      const userDTO = new UserDTO();
      userDTO.id = user.id;
      userDTO.name = user.name;
      userDTO.email = user.email;
      userDTO.createdAt = user.createdAt;
      return userDTO;
    });

    return userList;
  }

  async findOne(id: number): Promise<UserDTO> {
    const user = await this._userRepository.findUserByIdAsync(id);
    if (!user) {
      throw new NotFoundException();
    }

    const userFound = new UserDTO();
    userFound.id = user.id;
    userFound.name = user.name;
    userFound.email = user.email;
    userFound.createdAt = user.createdAt;

    return userFound;
  }

  async edit(id: number, user: UserEntity): Promise<UserDTO> {
    const userEdited = await this._userRepository.editUserAsync(id, user);
    if (!userEdited) {
      throw new NotFoundException();
    }
    return userEdited;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this._userRepository.deleteUserAsync(user.id);
  }
}
