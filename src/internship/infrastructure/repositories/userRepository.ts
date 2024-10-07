//Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Entities
import { UserEntity } from 'src/internship/domain/entities/userEntity';
//Interfaces
import { IUserRepository } from 'src/internship/domain/interfaces/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly _userEntity: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    this._userEntity = userRepository;
  }

  async findAllUsersAsync(): Promise<UserEntity[]> {
    try {
      const items = await this._userEntity.find();
      return items;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findUserByIdAsync(id: number): Promise<UserEntity> {
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

  async createUserAsync(user: UserEntity): Promise<void> {
    try {
      await this._userEntity.save(user);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async editUserAsync(userId: number, user: UserEntity): Promise<void> {
    try {
      await this._userEntity.update(userId, user);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async deleteUserAsync(userId: number): Promise<void> {
    try {
      await this._userEntity.delete(userId);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }
}
