import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectEntity } from '../reducers/projects.reducer';

@Injectable()
export class ProjectsDataService {

  readonly baseUrl = environment.apiUrl + 'projects/';

  constructor(private client: HttpClient) { }

  getAllProjects(): Observable<ProjectEntity[]> {
    return this.client.get<GetProjectsResponse>(this.baseUrl)
      .pipe(
        map(response => response.data)
      );
  }

}

interface GetProjectsResponse {
  data: ProjectEntity[];
}
