// src/app/store/tasks/tasks.actions.ts
import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction('[Task API] Load Success', props<{ tasks: Task[] }>());
export const addTask = createAction('[Task Form] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task Form] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task List] Delete Task', props<{ id: string }>());
