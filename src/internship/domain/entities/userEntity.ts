import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organizationEntity';

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
  careerId: number;

  @Column()
  isAdmin: boolean;

  @Column()
  rol: string;

  @Column() ß;
  isVerified: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.users)
  organization: OrganizationEntity;
}
