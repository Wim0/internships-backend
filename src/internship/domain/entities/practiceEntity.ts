import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './userEntity';

@Entity('practice')
export class PracticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  estudianteId: number;

  @Column({ nullable: true })
  professorId: number;

  @Column()
  isSolicited: boolean;

  @Column()
  isAccepted: boolean;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  companyDirection: string;

  @Column({ nullable: true })
  companyEmail: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  companyEvaluation: number;

  @ManyToOne(() => UserEntity, (user) => user.practicesAsStudent)
  estudiante: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.practicesAsProfessor)
  professor: UserEntity;
}
