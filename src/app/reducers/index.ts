import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';
import * as models from '../models/todos.models';

export interface AppState {
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer
};

// Feature seletct (done, we aren't in a feature)

// one per branch on the state (right now we have one called Todos)
const selectTodosBranch = (state: AppState) => state.todos;


// any helpers (not usually exported)

const { selectAll: selectAllTodoArray } = fromTodos.adapter.getSelectors(selectTodosBranch);
const selectTodoItemsListModel = createSelector(
  selectAllTodoArray,
  (todos) => todos as models.TodoListItem[]
);

// what components need
export const selectInboxItems = createSelector(
  selectTodoItemsListModel,
  items => items.filter(item => !item.dueDate && !item.project)
);

export const selectNumberOfInboxItems = createSelector(
  selectInboxItems,
  items => items.length
);
