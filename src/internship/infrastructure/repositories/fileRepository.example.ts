//Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Entities
import { Action } from '../../domain/entities/fileEntity.example';
//Interfaces
import { IActionRepository } from '../../domain/interfaces/IFileRepository.example';

@Injectable()
export class ActionRepository implements IActionRepository {
  private readonly _actionEntity: Repository<Action>;

  constructor(@InjectRepository(Action) actionRepository: Repository<Action>) {
    this._actionEntity = actionRepository;
  }

  async createActionAsync(action: Action): Promise<Action> {
    try {
      const item = await this._actionEntity.save(action);
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findAllActionsAsync(): Promise<Action[]> {
    try {
      const items = await this._actionEntity.find();
      return items;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findActionByIdAsync(id: number): Promise<Action> {
    try {
      const item = await this._actionEntity.findOne({
        where: { id },
      });
      return item;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async findAllActionsByClimateIdAsync(climateId: number): Promise<Action[]> {
    try {
      const items = await this._actionEntity.find({
        where: { climateId },
      });
      return items;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  //Probar! Quiza solo sea necesario el de crear y el de encontrar para el update
  async updateActionByIdAsync(id: number): Promise<Action> {
    try {
      const foundItem = await this._actionEntity.findOne({
        where: { id },
      });

      const updatedItem = await this._actionEntity.save(foundItem);
      return updatedItem;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }

  async deleteActionAsync(action: Action): Promise<boolean> {
    try {
      const item = await this._actionEntity.remove(action);
      return item instanceof Action;
    } catch (err) {
      console.error(`Error: ${err}`);
      return null;
    }
  }
}
