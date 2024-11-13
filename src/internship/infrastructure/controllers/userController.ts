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
  Inject,
} from '@nestjs/common';
//Interfaces
import { IUserService } from 'src/internship/domain/interfaces/IUserService';
//Entities(quizá hay que cambiarlo por un DTO)
import { UserEntity } from '../../domain/entities/userEntity';

@Controller('user')
export class UserController {
  private readonly _userService: IUserService;

  constructor(@Inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @Get()
  findAllUsers() {
    return this._userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this._userService.findUserById(+id);
  }

  @Post()
  createUser(@Body() user: UserEntity) {
    return this._userService.createUser(user);
  }

  @Put(':id')
  editUserById(@Param('id') id: string, @Body() user: UserEntity) {
    return this._userService.editUserById(+id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this._userService.deleteUserById(+id);
  }
}
