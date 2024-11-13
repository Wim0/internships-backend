import { OrganizationDTO } from 'src/internship/application/models/organizationDTO';
import { OrganizationEntity } from '../entities/organizationEntity';

export interface IOrganizationRepository {
  findAllOrganizations(): Promise<OrganizationEntity[]>;
  findOrganizationById(id: number): Promise<OrganizationEntity>;
  findOrganizationByName(name: string): Promise<OrganizationEntity>;
  createOrganization(
    organization: OrganizationEntity,
  ): Promise<OrganizationEntity>;
  editOrganizationById(
    organizationId: number,
    organization: OrganizationEntity,
  ): Promise<OrganizationDTO>;
  deleteOrganizationById(organizationId: number): Promise<boolean>;
}
