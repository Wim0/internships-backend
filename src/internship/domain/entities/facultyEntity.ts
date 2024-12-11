import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrganizationEntity } from './organizationEntity';
import { UserEntity } from './userEntity';

@Entity('faculty')
export class FacultyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  organizationId: number;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.faculties)
  organization: OrganizationEntity;

  @OneToMany(() => UserEntity, (user) => user.faculty)
  users: UserEntity[];
}
