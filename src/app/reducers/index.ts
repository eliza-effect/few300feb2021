import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';
import * as models from '../models';
import * as fromProjects from './projects.reducer';
import * as fromAuth from './auth.reducer';

export interface AppState {
  todos: fromTodos.TodosState;
  projects: fromProjects.ProjectState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer,
  projects: fromProjects.reducer,
  auth: fromAuth.reducer
};

// Feature seletct (done, we aren't in a feature)

// one per branch on the state (right now we have one called Todos)
const selectTodosBranch = (state: AppState) => state.todos;
const selectProjectsBranch = (state: AppState) => state.projects;
const selectAuthBranch = (state: AppState) => state.auth;

// any helpers (not usually exported)

const { selectAll: selectAllTodoArray } = fromTodos.adapter.getSelectors(selectTodosBranch);
const selectTodoItemsListModel = createSelector(
  selectAllTodoArray,
  (todos) => todos as models.TodoListItem[]
);

const { selectAll: selectAllProjectsArray } = fromProjects.adapter.getSelectors(selectProjectsBranch);


// what components need
export const selectInboxItems = createSelector(
  selectTodoItemsListModel,
  items => items.filter(item => !item.dueDate && !item.project)
);

export const selectNumberOfInboxItems = createSelector(
  selectInboxItems,
  items => items.length
);

export const selectProjectList = createSelector(
  selectAllProjectsArray,
  selectTodoItemsListModel,
  (projects, todos) => {
    return projects.map(project => ({
      ...project,
      numberOfTodos: todos.filter(todo => todo.project === project.name).length
    } as models.ProjectListItem));
  });


export const selectTodosForProject = createSelector(
  selectAllTodoArray,
  (todos, props: { project: string }) => {
    return todos.filter(todo => todo.project === props.project)
      .map(todo => todo as models.TodoListItem[]);
  }
);

export const selectIsLoggedIn = createSelector(
  selectAuthBranch,
  b => b.isLoggedIn
);
