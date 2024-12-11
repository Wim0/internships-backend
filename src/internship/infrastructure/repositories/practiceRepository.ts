import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PracticeEntity } from '../../domain/entities/practiceEntity';
import { IPracticeRepository } from '../../domain/interfaces/IPracticeRepository';
import { PracticeDTO } from 'src/internship/application/models/practiceDTO';

@Injectable()
export class PracticeRepository implements IPracticeRepository {
  private readonly _practiceEntity: Repository<PracticeEntity>;

  constructor(
    @InjectRepository(PracticeEntity)
    practiceRepository: Repository<PracticeEntity>,
  ) {
    this._practiceEntity = practiceRepository;
  }

  async findAllPractices(): Promise<PracticeEntity[]> {
    return this._practiceEntity.find();
  }

  async createPractice(practice: PracticeEntity): Promise<PracticeEntity> {
    return this._practiceEntity.save(practice);
  }

  async updatePractice(
    id: number,
    practice: PracticeEntity,
  ): Promise<PracticeDTO> {
    try {
      await this._practiceEntity.update(id, practice);
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }
}
