import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "environments/environment";
import { TProject } from "app/types/project.type";
const PROJECT_ENPOIT = {
  GET_ALL: "project",
  BY_ID: "projectById/",
  ADD_PROJECT: "project/add",
  UPDATE_PROJECT: "project/update/",
};
export type ProjectForm = Pick<
  TProject,
  "name" | "description" | "teamSize" | "dateOfStart"
>;

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(baseURL + PROJECT_ENPOIT.GET_ALL);
  }
  getById(id: string) {
    return this.http.get(baseURL + PROJECT_ENPOIT.BY_ID + id);
  }
  addProject(body: ProjectForm) {
    return this.http.post(baseURL + PROJECT_ENPOIT.ADD_PROJECT, body);
  }
  updateProject(body: ProjectForm,id:string) {
    return this.http.put(baseURL + PROJECT_ENPOIT.UPDATE_PROJECT+id, body);
  }
}
