import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacultyEntity } from '../../domain/entities/facultyEntity';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';

@Injectable()
export class FacultyRepository implements IFacultyRepository {
  private readonly _facultyEntity: Repository<FacultyEntity>;

  constructor(
    @InjectRepository(FacultyEntity)
    facultyRepository: Repository<FacultyEntity>,
  ) {
    this._facultyEntity = facultyRepository;
  }

  async createFaculty(faculty: FacultyEntity): Promise<FacultyEntity> {
    return await this._facultyEntity.save(faculty);
  }

  async findAllFaculties(): Promise<FacultyEntity[]> {
    return await this._facultyEntity.find();
  }

  async findFacultyById(id: number): Promise<FacultyEntity> {
    return await this._facultyEntity.findOne({ where: { id } });
  }

  async editFacultyById(
    id: number,
    faculty: FacultyEntity,
  ): Promise<FacultyEntity> {
    await this._facultyEntity.update(id, faculty);
    return this.findFacultyById(id);
  }

  async deleteFacultyById(id: number): Promise<boolean> {
    const result = await this._facultyEntity.delete(id);
    return result.affected > 0;
  }
}
