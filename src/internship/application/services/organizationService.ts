import { OrganizationEntity } from '../../domain/entities/organizationEntity';
import TYPES from '../../../types';
//Packages
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
//DTOs
import { OrganizationDTO } from 'src/internship/application/models/organizationDTO';
import { CreateOrganizationDTO } from 'src/internship/application/models/createOrganizationDTO';
//Interfaces
import { IOrganizationRepository } from '../../domain/interfaces/IOrganizationRepository';
import { IOrganizationService } from '../../domain/interfaces/IOrganizationService';

@Injectable()
export class OrganizationService implements IOrganizationService {
  private readonly _organizationRepository: IOrganizationRepository;

  constructor(
    @Inject(TYPES.IOrganizationRepository)
    organizationRepository: IOrganizationRepository,
  ) {
    this._organizationRepository = organizationRepository;
  }

  async createOrganization(
    createOrganizationDTO: CreateOrganizationDTO,
  ): Promise<OrganizationEntity> {
    try {
      const currentDate = new Date();

      const organization = new OrganizationEntity();
      organization.name = createOrganizationDTO.name;
      organization.createdAt = currentDate;

      const organizationAlreadyExists =
        await this._organizationRepository.findOrganizationByName(
          createOrganizationDTO.name,
        );
      if (organizationAlreadyExists) {
        console.log('Organization already exists');
        throw new ConflictException(
          'Organization with this email already exists',
        );
      }

      const organizationCreated =
        await this._organizationRepository.createOrganization(organization);
      if (!organizationCreated) {
        console.log('Organization not created');
        throw new NotFoundException();
      }

      return organizationCreated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllOrganizations(): Promise<OrganizationDTO[]> {
    const organizations =
      await this._organizationRepository.findAllOrganizations();
    if (!organizations) {
      throw new NotFoundException();
    }
    const organizationList = organizations.map((organization) => {
      const organizationDTO = new OrganizationDTO();
      organizationDTO.id = organization.id;
      organizationDTO.name = organization.name;

      return organizationDTO;
    });

    return organizationList;
  }

  async findOrganizationById(id: number): Promise<OrganizationDTO> {
    const organization =
      await this._organizationRepository.findOrganizationById(id);
    if (!organization) {
      throw new NotFoundException();
    }

    const organizationFound = new OrganizationDTO();
    organizationFound.id = organization.id;
    organizationFound.name = organization.name;

    return organizationFound;
  }

  async editOrganizationById(
    id: number,
    organization: OrganizationEntity,
  ): Promise<OrganizationDTO> {
    const organizationEdited =
      await this._organizationRepository.editOrganizationById(id, organization);
    if (!organizationEdited) {
      throw new NotFoundException();
    }
    return organizationEdited;
  }

  async deleteOrganizationById(id: number): Promise<boolean> {
    const organization = await this.findOrganizationById(id);
    if (!organization) {
      throw new NotFoundException();
    }
    return await this._organizationRepository.deleteOrganizationById(
      organization.id,
    );
  }
}
