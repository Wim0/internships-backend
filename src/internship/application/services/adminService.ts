import { Injectable, NotFoundException } from '@nestjs/common';
import { IAdminService } from 'src/internship/domain/interfaces/IAdminService';
import { IAdminRepository } from 'src/internship/domain/interfaces/IAdminRepository';
import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from 'src/internship/domain/entities/userEntity';
import TYPES from 'src/types';
import { Inject } from '@nestjs/common';

@Injectable()
export class AdminService implements IAdminService {
  private readonly _adminRepository: IAdminRepository;

  constructor(
    @Inject(TYPES.IAdminRepository) adminRepository: IAdminRepository,
  ) {
    this._adminRepository = adminRepository;
  }

  async findAllAdmins(): Promise<UserDTO[]> {
    const admins = await this._adminRepository.findAllAdmins();
    if (!admins) {
      throw new NotFoundException();
    }
    return admins.map((admin) => {
      const adminDTO = new UserDTO();
      adminDTO.id = admin.id;
      adminDTO.name = admin.name;
      adminDTO.lastName = admin.lastName;
      adminDTO.email = admin.email;
      adminDTO.organizationId = admin.organizationId;
      adminDTO.facultyId = admin.facultyId;
      adminDTO.isAdmin = admin.isAdmin;
      adminDTO.rol = admin.rol;
      adminDTO.isVerified = admin.isVerified;
      return adminDTO;
    });
  }

  async editAdminById(id: number, user: UserEntity): Promise<UserDTO> {
    return await this._adminRepository.editAdminById(id, user);
  }

  async deactivateAdminById(id: number): Promise<boolean> {
    return await this._adminRepository.deactivateAdminById(id);
  }
}
