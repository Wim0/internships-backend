import TYPES from 'src/types';
//Services
import { ActionService } from 'src/internship/application/services/fileService.example';
//Repositories
import { ActionRepository } from './fileRepository.example';

export const providers = [
  {
    provide: TYPES.IActionService,
    useClass: ActionService,
  },
  {
    provide: TYPES.IActionRepository,
    useClass: ActionRepository,
  },
];
