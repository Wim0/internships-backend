import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import TYPES from 'src/types';
import { Inject } from '@nestjs/common';
import { PracticeEntity } from '../../domain/entities/practiceEntity';
import { PracticeDTO } from 'src/internship/application/models/practiceDTO';
import { IPracticeService } from 'src/internship/domain/interfaces/IPracticeService';

@Controller('practice')
export class PracticeController {
  private readonly _practiceService: IPracticeService;

  constructor(
    @Inject(TYPES.IPracticeService) practiceService: IPracticeService,
  ) {
    this._practiceService = practiceService;
  }
  @Get()
  async findAllPractices(): Promise<PracticeEntity[]> {
    return this._practiceService.findAllPractices();
  }

  @Post()
  async createPractice(
    @Body() practice: PracticeEntity,
  ): Promise<PracticeEntity> {
    return this._practiceService.createPractice(practice);
  }

  @Put(':id')
  async updatePractice(
    @Param('id') id: number,
    @Body() practice: PracticeEntity,
  ): Promise<PracticeDTO> {
    return this._practiceService.updatePractice(id, practice);
  }
}
