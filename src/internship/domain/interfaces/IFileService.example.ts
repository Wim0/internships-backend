import { CreateActionDto } from '../../application/models/fileDTO.example';
import { Action } from '../../domain/entities/fileEntity.example';

export interface IActionService {
  create(createActionDto: CreateActionDto): Promise<Action>;
  findAll(): Promise<Action[]>;
  findOne(id: number): Promise<Action>;
  delete(id: number): Promise<boolean>;
}
