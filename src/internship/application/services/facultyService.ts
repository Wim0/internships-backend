import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';
import { IFacultyService } from '../../domain/interfaces/IFacultyService';
import { FacultyEntity } from '../../domain/entities/facultyEntity';
import { CreateFacultyDTO } from '../models/createFacultyDTO';
import TYPES from 'src/types';

@Injectable()
export class FacultyService implements IFacultyService {
  private readonly _facultyRepository: IFacultyRepository;

  constructor(
    @Inject(TYPES.IFacultyRepository) adminRepository: IFacultyRepository,
  ) {
    this._facultyRepository = adminRepository;
  }

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

  async findFacultiesByOrganizationId(
    organizationId: number,
  ): Promise<FacultyEntity[]> {
    return await this._facultyRepository.findFacultiesByOrganizationId(
      organizationId,
    );
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
