import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrganizationEntity } from './organizationEntity';
import { FacultyEntity } from './facultyEntity';
import { PracticeEntity } from './practiceEntity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  organizationId: number;

  @Column({ nullable: true })
  facultyId: number;

  @Column()
  isAdmin: boolean;

  @Column()
  rol: string;

  @Column()
  isVerified: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.users)
  organization: OrganizationEntity;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.users)
  faculty: FacultyEntity;

  @OneToMany(() => PracticeEntity, (practice) => practice.estudiante)
  practicesAsStudent: PracticeEntity[];

  @OneToMany(() => PracticeEntity, (practice) => practice.professor)
  practicesAsProfessor: PracticeEntity[];
}
