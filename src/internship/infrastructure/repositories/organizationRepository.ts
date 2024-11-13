//Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Entities
import { OrganizationEntity } from 'src/internship/domain/entities/organizationEntity';
//Interfaces
import { IOrganizationRepository } from 'src/internship/domain/interfaces/IOrganizationRepository';
import { OrganizationDTO } from 'src/internship/application/models/organizationDTO';
import { error } from 'console';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  private readonly _organizationEntity: Repository<OrganizationEntity>;

  constructor(
    @InjectRepository(OrganizationEntity)
    organizationRepository: Repository<OrganizationEntity>,
  ) {
    this._organizationEntity = organizationRepository;
  }

  async createOrganization(
    organization: OrganizationEntity,
  ): Promise<OrganizationEntity> {
    try {
      const createOrganization =
        await this._organizationEntity.save(organization);
      if (!createOrganization) {
        console.log('Organization not created in REPOSITORY');
        throw new error();
      }
      return createOrganization;
    } catch (err) {
      console.log('Error creating organization in REPOSITORY');
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findAllOrganizations(): Promise<OrganizationEntity[]> {
    try {
      const items = await this._organizationEntity.find();
      return items;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findOrganizationById(id: number): Promise<OrganizationEntity> {
    try {
      const item = await this._organizationEntity.findOne({
        where: { id },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findOrganizationByName(name: string): Promise<OrganizationEntity> {
    try {
      const item = await this._organizationEntity.findOne({
        where: { name },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async editOrganizationById(
    organizationId: number,
    organization: OrganizationEntity,
  ): Promise<OrganizationDTO> {
    try {
      await this._organizationEntity.update(organizationId, organization);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async deleteOrganizationById(organizationId: number): Promise<boolean> {
    try {
      await this._organizationEntity.delete(organizationId);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }
}
