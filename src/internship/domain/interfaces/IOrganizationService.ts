import { OrganizationEntity } from '../entities/organizationEntity';
import { CreateOrganizationDTO } from 'src/internship/application/models/createOrganizationDTO';
import { OrganizationDTO } from 'src/internship/application/models/organizationDTO';

export interface IOrganizationService {
  createOrganization(
    createOrganizationDTO: CreateOrganizationDTO,
  ): Promise<OrganizationEntity>;
  findAllOrganizations(): Promise<OrganizationDTO[]>;
  findOrganizationById(id: number): Promise<OrganizationDTO>;
  editOrganizationById(
    id: number,
    organization: OrganizationEntity,
  ): Promise<OrganizationDTO>;
  deleteOrganizationById(id: number): Promise<boolean>;
}
