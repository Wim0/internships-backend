import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';
import { IFacultyService } from '../../domain/interfaces/IFacultyService';
import { FacultyEntity } from '../../domain/entities/facultyEntity';
import { CreateFacultyDTO } from '../models/createFacultyDTO';

@Injectable()
export class FacultyService implements IFacultyService {
  constructor(
    @Inject('IFacultyRepository')
    private readonly _facultyRepository: IFacultyRepository,
  ) {}

  async createFaculty(
    createFacultyDTO: CreateFacultyDTO,
  ): Promise<FacultyEntity> {
    const faculty = new FacultyEntity();
    faculty.name = createFacultyDTO.name;
    faculty.organization = { id: createFacultyDTO.organizationId } as any;
    return await this._facultyRepository.createFaculty(faculty);
  }

  async findAllFaculties(): Promise<FacultyEntity[]> {
    return await this._facultyRepository.findAllFaculties();
  }

  async findFacultyById(id: number): Promise<FacultyEntity> {
    return await this._facultyRepository.findFacultyById(id);
  }

  async editFacultyById(
    id: number,
    createFacultyDTO: CreateFacultyDTO,
  ): Promise<FacultyEntity> {
    const faculty = new FacultyEntity();
    faculty.name = createFacultyDTO.name;
    faculty.organization = { id: createFacultyDTO.organizationId } as any;
    return await this._facultyRepository.editFacultyById(id, faculty);
  }

  async deleteFacultyById(id: number): Promise<boolean> {
    return await this._facultyRepository.deleteFacultyById(id);
  }
}
