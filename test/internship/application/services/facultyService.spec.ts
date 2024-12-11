import { Test, TestingModule } from '@nestjs/testing';
import { FacultyService } from 'src/internship/application/services/facultyService';
import { IFacultyRepository } from 'src/internship/domain/interfaces/IFacultyRepository';
import { CreateFacultyDTO } from 'src/internship/application/models/createFacultyDTO';
import { FacultyEntity } from 'src/internship/domain/entities/facultyEntity';
import TYPES from 'src/types';

describe('FacultyService', () => {
  let service: FacultyService;
  let repository: IFacultyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacultyService,
        {
          provide: TYPES.IFacultyRepository,
          useValue: {
            createFaculty: jest.fn(),
            findAllFaculties: jest.fn(),
            findFacultyById: jest.fn(),
            findFacultiesByOrganizationId: jest.fn(),
            editFacultyById: jest.fn(),
            deleteFacultyById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FacultyService>(FacultyService);
    repository = module.get<IFacultyRepository>(TYPES.IFacultyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFaculty', () => {
    it('should create a faculty', async () => {
      const createFacultyDTO: CreateFacultyDTO = {
        name: 'Test Faculty',
        organizationId: 1,
      };
      const facultyEntity = new FacultyEntity();
      facultyEntity.name = createFacultyDTO.name;
      facultyEntity.organization = {
        id: createFacultyDTO.organizationId,
      } as any;

      jest.spyOn(repository, 'createFaculty').mockResolvedValue(facultyEntity);

      const result = await service.createFaculty(createFacultyDTO);
      expect(result).toEqual(facultyEntity);
      expect(repository.createFaculty).toHaveBeenCalledWith(facultyEntity);
    });
  });

  describe('findAllFaculties', () => {
    it('should return an array of faculties', async () => {
      const faculties = [new FacultyEntity(), new FacultyEntity()];
      jest.spyOn(repository, 'findAllFaculties').mockResolvedValue(faculties);

      const result = await service.findAllFaculties();
      expect(result).toEqual(faculties);
      expect(repository.findAllFaculties).toHaveBeenCalled();
    });
  });

  describe('findFacultyById', () => {
    it('should return a faculty by id', async () => {
      const faculty = new FacultyEntity();
      jest.spyOn(repository, 'findFacultyById').mockResolvedValue(faculty);

      const result = await service.findFacultyById(1);
      expect(result).toEqual(faculty);
      expect(repository.findFacultyById).toHaveBeenCalledWith(1);
    });
  });

  describe('findFacultiesByOrganizationId', () => {
    it('should return faculties by organization id', async () => {
      const faculties = [new FacultyEntity(), new FacultyEntity()];
      jest
        .spyOn(repository, 'findFacultiesByOrganizationId')
        .mockResolvedValue(faculties);

      const result = await service.findFacultiesByOrganizationId(1);
      expect(result).toEqual(faculties);
      expect(repository.findFacultiesByOrganizationId).toHaveBeenCalledWith(1);
    });
  });

  describe('editFacultyById', () => {
    it('should edit a faculty by id', async () => {
      const createFacultyDTO: CreateFacultyDTO = {
        name: 'Updated Faculty',
        organizationId: 1,
      };
      const facultyEntity = new FacultyEntity();
      facultyEntity.name = createFacultyDTO.name;
      facultyEntity.organization = {
        id: createFacultyDTO.organizationId,
      } as any;

      jest
        .spyOn(repository, 'editFacultyById')
        .mockResolvedValue(facultyEntity);

      const result = await service.editFacultyById(1, createFacultyDTO);
      expect(result).toEqual(facultyEntity);
      expect(repository.editFacultyById).toHaveBeenCalledWith(1, facultyEntity);
    });
  });

  describe('deleteFacultyById', () => {
    it('should delete a faculty by id', async () => {
      jest.spyOn(repository, 'deleteFacultyById').mockResolvedValue(true);

      const result = await service.deleteFacultyById(1);
      expect(result).toEqual(true);
      expect(repository.deleteFacultyById).toHaveBeenCalledWith(1);
    });
  });
});
