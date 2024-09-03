import { Action } from '../../domain/entities/fileEntity.example';

export interface IActionRepository {
  createActionAsync(action: Action): Promise<Action>;
  findAllActionsAsync(): Promise<Action[]>;
  findActionByIdAsync(id: number): Promise<Action>;
  deleteActionAsync(action: Action): Promise<boolean>;
  findAllActionsByClimateIdAsync(id: number): Promise<Action[]>;
}
