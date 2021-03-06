import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-item.actions';

export interface TodoEntity {
  id: string;
  name: string;
  dueDate?: string;
  project?: string;
  completed: boolean;
}

export interface TodosState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

// const initialState: TodosState = {
//   ids: ['1', '2', '3', '4'],
//   entities: {
//     1: { id: '1', name: 'Make Chicken', completed: false },
//     2: { id: '2', name: 'Organize basement', project: 'Home', completed: false },
//     3: { id: '3', name: 'Vacuum Bathroom', project: 'Home', dueDate: '2021-02-24T20:39:47.830Z', completed: false },
//     4: { id: '4', name: 'Greeble ', dueDate: '2021-05-15T20:39:47.830Z', completed: false }
//   }
// };


const initialState = adapter.getInitialState();

const reducerFunction = createReducer( // return a new state that has this added to it
  initialState,
  on(actions.todoItemAddedSuccess, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }), // could also use the updateOne below {id: action.oldId, changes: {id: action.payload.id}, state}
  on(actions.todoItemAddedFailure, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.todoItemMarkedComplete, actions.todoItemMarkedIncomplete,
    (state, action) => adapter.updateOne({ id: action.item.id, changes: { completed: !action.item.completed } }, state)),
  on(actions.loadTodosSucceeded, (state, action) => adapter.setAll(action.payload, state))
);

export function reducer(state: TodosState = initialState, action: Action): TodosState {
  return reducerFunction(state, action);
}



