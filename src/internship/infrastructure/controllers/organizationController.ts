import TYPES from '../../../types';
//Packages
import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
//Interfaces
import { IOrganizationService } from 'src/internship/domain/interfaces/IOrganizationService';
//Entities(quizá hay que cambiarlo por un DTO)
import { OrganizationEntity } from '../../domain/entities/organizationEntity';

@Controller('organization')
export class OrganizationController {
  private readonly _organizationService: IOrganizationService;

  constructor(
    @Inject(TYPES.IOrganizationService)
    organizationService: IOrganizationService,
  ) {
    this._organizationService = organizationService;
  }

  @Get()
  findAllOrganizations() {
    return this._organizationService.findAllOrganizations();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this._organizationService.findOrganizationById(+id);
  }

  @Post()
  createUser(@Body() organization: OrganizationEntity) {
    return this._organizationService.createOrganization(organization);
  }

  @Put(':id')
  editUserById(
    @Param('id') id: string,
    @Body() organization: OrganizationEntity,
  ) {
    return this._organizationService.editOrganizationById(+id, organization);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this._organizationService.deleteOrganizationById(+id);
  }
}
