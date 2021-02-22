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
      id: 'T' + fakeId++
    } as TodoEntity
  })
);
// happy path



// errors
