import TYPES from '../../../types';
//Packages
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Inject,
} from '@nestjs/common';
//DTOs
import { CreateActionDto } from '../../application/models/fileDTO.example';
//Interfaces
import { IActionService } from '../../domain/interfaces/IFileService.example';

@Controller('action')
export class ActionController {
  private readonly _actionService: IActionService;
  private readonly _logger = new Logger('ActionController');

  constructor(@Inject(TYPES.IActionService) actionService: IActionService) {
    this._actionService = actionService;
  }

  @Post()
  create(@Body() createActionDto: CreateActionDto) {
    return this._actionService.create(createActionDto);
  }

  @Get()
  findAll() {
    return this._actionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._actionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._actionService.delete(+id);
  }
}
