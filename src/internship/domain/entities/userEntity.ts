import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  organizationId: number;

  @Column()
  careerId: number;

  @Column()
  isAdmin: boolean;

  @Column()
  rol: string;

  @Column()
  isVerified: boolean;

  @Column()
  createdAt: Date;
}
