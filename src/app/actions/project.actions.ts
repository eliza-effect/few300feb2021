import { createAction, props } from '@ngrx/store';
import { ProjectCreate } from '../models';
import { ProjectEntity } from '../reducers/projects.reducer';

let fakeId = 1;

// initiator
// name, dueDate?, project?
// export const todoItemAdded = createAction(
//   '[app] todo item added',
//   props<{ item: TodoCreate }>()
// );

export const projectAdded = createAction(
  '[app] project added',
  ({ item }: { item: ProjectCreate }) => ({
    payload: {
      ...item,
      completed: false,
      id: 'T' + fakeId++
    } as ProjectEntity
  })
);


export const loadProjects = createAction(
  '[app] load projects'
);


export const loadProjectsSucceeded = createAction(
  '[app] loading projects succeeded',
  props<{ payload: ProjectEntity[] }>()
);

export const loadProjectsFailed = createAction(
  '[app] loading projects failed',
  props<{ errorMessage: string }>()
);
// happy path



// errors
