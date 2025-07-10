import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../models/task.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [];
    return { tasks };
  }
}
