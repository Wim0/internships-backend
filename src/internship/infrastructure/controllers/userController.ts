import TYPES from '../../../types';
//Packages
import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Inject,
} from '@nestjs/common';
//Interfaces
import { IUserService } from 'src/internship/domain/interfaces/IUserService';
//Entities(quizá hay que cambiarlo por un DTO)
import { UserEntity } from '../../domain/entities/userEntity';

@Controller('user')
export class UserController {
  private readonly _userService: IUserService;
  private readonly _logger = new Logger('ServiceController');

  constructor(@Inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._userService.findOne(+id);
  }

  @Post()
  create(@Body() user: UserEntity) {
    return this._userService.create(user);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() user: UserEntity) {
    return this._userService.edit(+id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._userService.delete(+id);
  }
}
