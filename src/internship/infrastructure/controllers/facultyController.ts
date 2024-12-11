import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IFacultyService } from '../../domain/interfaces/IFacultyService';
import { CreateFacultyDTO } from '../../application/models/createFacultyDTO';
import { FacultyEntity } from '../../domain/entities/facultyEntity';
import TYPES from '../../../types';
import { Inject } from '@nestjs/common';
@Controller('faculty')
export class FacultyController {
  constructor(
    @Inject(TYPES.IFacultyService)
    private readonly _facultyService: IFacultyService,
  ) {}

  @Post()
  async createFaculty(
    @Body() createFacultyDTO: CreateFacultyDTO,
  ): Promise<FacultyEntity> {
    return await this._facultyService.createFaculty(createFacultyDTO);
  }

  @Get()
  async findAllFaculties(): Promise<FacultyEntity[]> {
    return await this._facultyService.findAllFaculties();
  }

  @Get(':id')
  async findFacultyById(@Param('id') id: number): Promise<FacultyEntity> {
    return await this._facultyService.findFacultyById(id);
  }

  @Put(':id')
  async editFacultyById(
    @Param('id') id: number,
    @Body() createFacultyDTO: CreateFacultyDTO,
  ): Promise<FacultyEntity> {
    return await this._facultyService.editFacultyById(id, createFacultyDTO);
  }

  @Delete(':id')
  async deleteFacultyById(@Param('id') id: number): Promise<boolean> {
    return await this._facultyService.deleteFacultyById(id);
  }
}
