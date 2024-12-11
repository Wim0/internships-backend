import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from 'src/internship/application/services/organizationService';
import { IOrganizationRepository } from 'src/internship/domain/interfaces/IOrganizationRepository';
import { CreateOrganizationDTO } from 'src/internship/application/models/createOrganizationDTO';
import { OrganizationEntity } from 'src/internship/domain/entities/organizationEntity';
import TYPES from 'src/types';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let repository: IOrganizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: TYPES.IOrganizationRepository,
          useValue: {
            createOrganization: jest.fn(),
            findOrganizationByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    repository = module.get<IOrganizationRepository>(
      TYPES.IOrganizationRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrganization', () => {
    it('should create an organization', async () => {
      const createOrganizationDTO: CreateOrganizationDTO = {
        name: 'Test Organization',
      };
      const organizationEntity = new OrganizationEntity();
      organizationEntity.name = createOrganizationDTO.name;

      jest.spyOn(repository, 'findOrganizationByName').mockResolvedValue(null);
      jest
        .spyOn(repository, 'createOrganization')
        .mockImplementation(async (entity) => {
          entity.createdAt = new Date();
          return entity;
        });

      const result = await service.createOrganization(createOrganizationDTO);
      expect(result).toEqual(
        expect.objectContaining({
          name: 'Test Organization',
          createdAt: expect.any(Date),
        }),
      );
      expect(repository.findOrganizationByName).toHaveBeenCalledWith(
        createOrganizationDTO.name,
      );
      expect(repository.createOrganization).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Organization',
        }),
      );
    });

    it('should throw a ConflictException if organization already exists', async () => {
      const createOrganizationDTO: CreateOrganizationDTO = {
        name: 'Test Organization',
      };
      const organizationEntity = new OrganizationEntity();
      organizationEntity.name = createOrganizationDTO.name;

      jest
        .spyOn(repository, 'findOrganizationByName')
        .mockResolvedValue(organizationEntity);

      await expect(
        service.createOrganization(createOrganizationDTO),
      ).rejects.toThrow('Organization with this email already exists');
      expect(repository.findOrganizationByName).toHaveBeenCalledWith(
        createOrganizationDTO.name,
      );
      expect(repository.createOrganization).not.toHaveBeenCalled();
    });

    it('should throw a NotFoundException if organization creation fails', async () => {
      const createOrganizationDTO: CreateOrganizationDTO = {
        name: 'Test Organization',
      };
      const organizationEntity = new OrganizationEntity();
      organizationEntity.name = createOrganizationDTO.name;

      jest.spyOn(repository, 'findOrganizationByName').mockResolvedValue(null);
      jest.spyOn(repository, 'createOrganization').mockResolvedValue(null);

      await expect(
        service.createOrganization(createOrganizationDTO),
      ).rejects.toThrow();
      expect(repository.findOrganizationByName).toHaveBeenCalledWith(
        createOrganizationDTO.name,
      );
      expect(repository.createOrganization).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Organization',
        }),
      );
    });
  });
});
