import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'action' })
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  actionDesc: string;

  @Column({ type: 'int' })
  climateId: number;
}
