import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import TYPES from 'src/types';
import { Inject } from '@nestjs/common';
import { PracticeEntity } from '../../domain/entities/practiceEntity';
import { PracticeDTO } from 'src/internship/application/models/practiceDTO';
import { IPracticeService } from 'src/internship/domain/interfaces/IPracticeService';
import { IUserService } from 'src/internship/domain/interfaces/IUserService';

@Controller('practice')
export class PracticeController {
  private readonly _practiceService: IPracticeService;
  private readonly _userService: IUserService;

  constructor(
    @Inject(TYPES.IPracticeService) practiceService: IPracticeService,
    @Inject(TYPES.IUserService) userService: IUserService,
  ) {
    this._practiceService = practiceService;
    this._userService = userService;
  }
  @Get()
  async findAllPractices(): Promise<any[]> {
    const practices = await this._practiceService.findAllPractices();
    return Promise.all(
      practices.map(async (practice) => {
        const estudianteData = await this._userService.findUserById(
          practice.estudianteId,
        );
        return {
          ...practice,
          estudianteData,
        };
      }),
    );
  }

  @Get('user/:userId')
  async findPracticesByUserId(
    @Param('userId') userId: number,
  ): Promise<PracticeEntity[]> {
    return this._practiceService.findPracticesByUserId(userId);
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
