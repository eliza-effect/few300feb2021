import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as actions from '../actions/project.actions';
import { ProjectsDataService } from '../services/projects-data.service';

@Injectable()
export class ProjectsEffects {

  // loadprojects => (go to the api) => (loadprojectsSucceeded | loadprojectsFailed)
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProjects),
      switchMap(() => this.service.getAllProjects()
        .pipe(
          map(payload => actions.loadProjectsSucceeded({ payload })),
          catchError((e) => of(actions.loadProjectsFailed({ errorMessage: 'Something bad happened to projects' })))
        )
      )
    ), { dispatch: true });

  constructor(
    private actions$: Actions,
    private service: ProjectsDataService
  ) { }
}
