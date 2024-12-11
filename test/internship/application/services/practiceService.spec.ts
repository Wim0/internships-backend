import { Test, TestingModule } from '@nestjs/testing';
import { PracticeService } from 'src/internship/application/services/practiceService';
import { IPracticeRepository } from 'src/internship/domain/interfaces/IPracticeRepository';
import { PracticeEntity } from 'src/internship/domain/entities/practiceEntity';
import TYPES from 'src/types';

describe('PracticeService', () => {
  let service: PracticeService;
  let repository: IPracticeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PracticeService,
        {
          provide: TYPES.IPracticeRepository,
          useValue: {
            findAllPractices: jest.fn(),
            createPractice: jest.fn(),
            updatePractice: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PracticeService>(PracticeService);
    repository = module.get<IPracticeRepository>(TYPES.IPracticeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllPractices', () => {
    it('should return an array of practices', async () => {
      const practices = [new PracticeEntity(), new PracticeEntity()];
      jest.spyOn(repository, 'findAllPractices').mockResolvedValue(practices);

      const result = await service.findAllPractices();
      expect(result).toEqual(practices);
      expect(repository.findAllPractices).toHaveBeenCalled();
    });
  });

  describe('createPractice', () => {
    it('should create a practice', async () => {
      const practiceEntity = new PracticeEntity();
      jest
        .spyOn(repository, 'createPractice')
        .mockResolvedValue(practiceEntity);

      const result = await service.createPractice(practiceEntity);
      expect(result).toEqual(practiceEntity);
      expect(repository.createPractice).toHaveBeenCalledWith(practiceEntity);
    });
  });

  describe('updatePractice', () => {
    it('should update a practice by id', async () => {
      const practiceEntity = new PracticeEntity();
      jest
        .spyOn(repository, 'updatePractice')
        .mockResolvedValue(practiceEntity);

      const result = await service.updatePractice(1, practiceEntity);
      expect(result).toEqual(practiceEntity);
      expect(repository.updatePractice).toHaveBeenCalledWith(1, practiceEntity);
    });
  });
});
