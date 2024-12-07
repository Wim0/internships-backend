import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organizationEntity';

@Entity()
export class FacultyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.faculties)
  organization: OrganizationEntity;
}
