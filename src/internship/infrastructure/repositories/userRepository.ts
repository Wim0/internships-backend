//Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Entities
import { UserEntity } from 'src/internship/domain/entities/userEntity';
//Interfaces
import { IUserRepository } from 'src/internship/domain/interfaces/IUserRepository';
import { UserDTO } from 'src/internship/application/models/userDTO';
import { error } from 'console';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly _userEntity: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    this._userEntity = userRepository;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      const createUser = await this._userEntity.save(user);
      if (!createUser) {
        console.log('User not created in REPOSITORY');
        throw new error();
      }
      return createUser;
    } catch (err) {
      console.log('Error creating user in REPOSITORY');
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const items = await this._userEntity.find();
      return items;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findUserById(id: number): Promise<UserEntity> {
    try {
      const item = await this._userEntity.findOne({
        where: { id },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<UserDTO> {
    try {
      const item = await this._userEntity.findOne({
        where: { email },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const item = await this._userEntity.findOne({
        where: { email, password },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async editUserById(userId: number, user: UserEntity): Promise<UserDTO> {
    try {
      await this._userEntity.update(userId, user);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async deleteUserByid(userId: number): Promise<boolean> {
    try {
      await this._userEntity.delete(userId);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }
}
