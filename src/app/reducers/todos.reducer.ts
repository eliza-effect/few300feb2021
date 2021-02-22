import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-item.actions';

export interface TodoEntity {
  id: string;
  name: string;
  dueDate?: string;
  project?: string;
}

export interface TodosState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState: TodosState = {
  ids: ['1', '2', '3', '4'],
  entities: {
    1: { id: '1', name: 'Make Chicken' },
    2: { id: '2', name: 'Organize basement', project: 'Home' },
    3: { id: '3', name: 'Vacuum Bathroom', project: 'Home', dueDate: '2021-02-24T20:39:47.830Z' },
    4: { id: '4', name: 'Greeble ', dueDate: '2021-05-15T20:39:47.830Z' }
  }
};


// const initialState = adapter.getInitialState();

const reducerFunction = createReducer( // return a new state that has this added to it
  initialState,
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: TodosState = initialState, action: Action): TodosState {
  return reducerFunction(state, action);
}



