import { PracticeDTO } from 'src/internship/application/models/practiceDTO';
import { PracticeEntity } from '../entities/practiceEntity';

export interface IPracticeService {
  findAllPractices(): Promise<PracticeEntity[]>;
  findPracticesByUserId(userId: number): Promise<PracticeEntity[]>;
  createPractice(practice: PracticeEntity): Promise<PracticeEntity>;
  updatePractice(id: number, practice: PracticeDTO): Promise<PracticeDTO>;
}
