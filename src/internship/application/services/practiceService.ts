import { Injectable } from '@nestjs/common';
import { PracticeEntity } from '../../domain/entities/practiceEntity';
import TYPES from '../../../types';
import { Inject } from '@nestjs/common';
import { PracticeDTO } from '../models/practiceDTO';
import { IPracticeRepository } from '../../domain/interfaces/IPracticeRepository';
import { IPracticeService } from '../../domain/interfaces/IPracticeService';

@Injectable()
export class PracticeService implements IPracticeService {
  private readonly _practiceRepository: IPracticeRepository;

  constructor(
    @Inject(TYPES.IPracticeRepository)
    practiceRepository: IPracticeRepository,
  ) {
    this._practiceRepository = practiceRepository;
  }

  async findAllPractices(): Promise<PracticeEntity[]> {
    return this._practiceRepository.findAllPractices();
  }

  async createPractice(practice: PracticeEntity): Promise<PracticeEntity> {
    return this._practiceRepository.createPractice(practice);
  }

  async updatePractice(
    id: number,
    practice: PracticeEntity,
  ): Promise<PracticeDTO> {
    return this._practiceRepository.updatePractice(id, practice);
  }
}
