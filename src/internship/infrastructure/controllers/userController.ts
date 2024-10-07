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
//DTOs
//Interfaces
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
//Entities(quizá hay que cambiarlo por un DTO)
import { UserEntity } from '../../domain/entities/userEntity';

@Controller('user')
export class UserController {
  private readonly _userRepository: IUserRepository;
  private readonly _logger = new Logger('ActionController');

  constructor(@Inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  @Get()
  findAll() {
    return this._userRepository.findAllUsersAsync();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._userRepository.findUserByIdAsync(+id);
  }

  @Post()
  create(@Body() user: UserEntity) {
    return this._userRepository.createUserAsync(user);
  }

  @Put(':id')
  edit(@Param('id') id: string, @Body() user: UserEntity) {
    return this._userRepository.editUserAsync(+id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._userRepository.deleteUserAsync(+id);
  }
}
