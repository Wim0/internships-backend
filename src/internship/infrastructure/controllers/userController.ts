import TYPES from '../../../types';
//Packages
import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
//DTOs
import { LoginUserDTO } from '../../application/models/loginUserDTO';
import { UserDTO } from '../../application/models/userDTO';
//Interfaces
import { IUserService } from 'src/internship/domain/interfaces/IUserService';
//Entities
import { UserEntity } from '../../domain/entities/userEntity';

@Controller('user')
export class UserController {
  private readonly _userService: IUserService;

  constructor(@Inject(TYPES.IUserService) userService: IUserService) {
    this._userService = userService;
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this._userService.login(loginUserDTO);
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

  @Patch(':id')
  editUserById(@Param('id') id: string, @Body() user: UserDTO) {
    return this._userService.editUserById(+id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this._userService.deleteUserById(+id);
  }
}
