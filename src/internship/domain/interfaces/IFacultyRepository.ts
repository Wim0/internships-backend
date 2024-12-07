import { FacultyEntity } from '../entities/facultyEntity';

export interface IFacultyRepository {
  createFaculty(faculty: FacultyEntity): Promise<FacultyEntity>;
  findAllFaculties(): Promise<FacultyEntity[]>;
  findFacultyById(id: number): Promise<FacultyEntity>;
  editFacultyById(id: number, faculty: FacultyEntity): Promise<FacultyEntity>;
  deleteFacultyById(id: number): Promise<boolean>;
}
