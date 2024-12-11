import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/internship/domain/entities/userEntity';
import { IAdminRepository } from 'src/internship/domain/interfaces/IAdminRepository';
import { UserDTO } from 'src/internship/application/models/userDTO';

@Injectable()
export class AdminRepository implements IAdminRepository {
  private readonly _userEntity: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>,
  ) {
    this._userEntity = userRepository;
  }

  async findAllAdmins(): Promise<UserEntity[]> {
    try {
      const admins = await this._userEntity.find({ where: { isAdmin: true } });
      return admins;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async editAdminById(userId: number, user: UserEntity): Promise<UserDTO> {
    try {
      await this._userEntity.update(userId, user);
      const updatedUser = await this._userEntity.findOne({
        where: { id: userId },
      });
      return updatedUser;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async deactivateAdminById(userId: number): Promise<boolean> {
    try {
      await this._userEntity.update(userId, { isAdmin: false });
      return true;
    } catch (err) {
      console.error(`Error: ${err}`);
      return false;
    }
  }
}
