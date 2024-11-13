import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: number;

  @Column()
  createdAt: Date;
}
