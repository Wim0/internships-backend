import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { IAdminService } from 'src/internship/domain/interfaces/IAdminService';
import { UserEntity } from 'src/internship/domain/entities/userEntity';
import { UserDTO } from 'src/internship/application/models/userDTO';
import TYPES from '../../../types';

@Controller('admin')
export class AdminController {
  constructor(
    @Inject(TYPES.IAdminService) private readonly _adminService: IAdminService,
  ) {}

  @Get()
  async findAllAdmins(): Promise<UserDTO[]> {
    return await this._adminService.findAllAdmins();
  }

  @Put(':id')
  async editAdminById(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<UserDTO> {
    return await this._adminService.editAdminById(id, user);
  }

  @Delete(':id')
  async deactivateAdminById(@Param('id') id: number): Promise<boolean> {
    return await this._adminService.deactivateAdminById(id);
  }
}
