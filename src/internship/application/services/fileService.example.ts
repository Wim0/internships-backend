import { Action } from '../../domain/entities/fileEntity.example';
import TYPES from '../../../types';
//Packages
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//DTOs
import { CreateActionDto } from '../../application/models/fileDTO.example';
//Interfaces
import { IActionService } from '../../domain/interfaces/IFileService.example';
import { IActionRepository } from '../../domain/interfaces/IFileRepository.example';

@Injectable()
export class ActionService implements IActionService {
  private readonly _actionRepository: IActionRepository;

  constructor(
    @Inject(TYPES.IActionRepository) actionRepository: IActionRepository,
  ) {
    this._actionRepository = actionRepository;
  }

  async create(createActionDto: CreateActionDto): Promise<Action> {
    try {
      const action = new Action();
      action.climateId = createActionDto.climateId;
      action.actionDesc = createActionDto.actionDesc;

      const actionCreated =
        await this._actionRepository.createActionAsync(action);
      if (!actionCreated) {
        throw new NotFoundException();
      }

      return actionCreated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<Action[]> {
    return await this._actionRepository.findAllActionsAsync();
  }

  async findOne(id: number): Promise<Action> {
    return await this._actionRepository.findActionByIdAsync(id);
  }

  async delete(id: number): Promise<boolean> {
    const action = await this.findOne(id);
    if (!action) {
      throw new NotFoundException();
    }
    return await this._actionRepository.deleteActionAsync(action);
  }
}
