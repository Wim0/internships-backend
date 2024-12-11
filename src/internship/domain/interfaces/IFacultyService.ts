import { FacultyEntity } from '../entities/facultyEntity';
import { CreateFacultyDTO } from '../../application/models/createFacultyDTO';

export interface IFacultyService {
  createFaculty(createFacultyDTO: CreateFacultyDTO): Promise<FacultyEntity>;
  findAllFaculties(): Promise<FacultyEntity[]>;
  findFacultyById(id: number): Promise<FacultyEntity>;
  editFacultyById(
    id: number,
    createFacultyDTO: CreateFacultyDTO,
  ): Promise<FacultyEntity>;
  deleteFacultyById(id: number): Promise<boolean>;
}
