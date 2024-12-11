import { PracticeDTO } from 'src/internship/application/models/practiceDTO';
import { PracticeEntity } from '../entities/practiceEntity';

export interface IPracticeService {
  findAllPractices(): Promise<PracticeEntity[]>;
  createPractice(practice: PracticeEntity): Promise<PracticeEntity>;
  updatePractice(id: number, practice: PracticeEntity): Promise<PracticeDTO>;
}
