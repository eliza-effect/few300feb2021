import { createAction, props } from '@ngrx/store';
import { TodoCreate } from '../models';
import { TodoEntity } from '../reducers/todos.reducer';

let fakeId = 1;

// initiator
// name, dueDate?, project?
// export const todoItemAdded = createAction(
//   '[app] todo item added',
//   props<{ item: TodoCreate }>()
// );

export const todoItemAdded = createAction(
  '[app] todo item added',
  ({ item }: { item: TodoCreate }) => ({
    payload: {
      ...item,
      completed: false,
      id: 'T' + fakeId++
    } as TodoEntity
  })
);


export const todoItemMarkedComplete = createAction(
  '[app] todo item marked complete',
  props<{ item: TodoEntity }>()
);

export const todoItemMarkedIncomplete = createAction(
  '[app] todo item marked incomplete',
  props<{ item: TodoEntity }>()
);

export const loadTodos = createAction(
  '[app] load todos'
);


export const loadTodosSucceeded = createAction(
  '[app] loading todos succeeded',
  props<{ payload: TodoEntity[] }>()
);

export const loadTodosFailed = createAction(
  '[app] loading todos failed',
  props<{ errorMessage: string }>()
);
// happy path



// errors
