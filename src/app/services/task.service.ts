import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TTask } from "app/types/task.type";
import { baseURL } from "environments/environment";
const TASK_ENPOINT = {
  GET_ALL: "task",
  GET_BY_ID: "taskByIdTask/",
  ADD_TASK: "task/add",
  UPDATE_TASK: "task/update/",
  DELETE_TASK: "task/remove/",
};
export type TaskForm = Pick<
  TTask,
  "assign" | "description" | "name" | "projectId"
>;
@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getAll(id: string) {
    return this.http.get(baseURL + TASK_ENPOINT.GET_ALL, {
      params: {
        projectId: id,
      },
    });
  }
  getById(id: string) {
    return this.http.get(baseURL + TASK_ENPOINT.GET_BY_ID+id);
  }
  addTask(body: TaskForm) {
    return this.http.post(baseURL + TASK_ENPOINT.ADD_TASK, body);
  }
  updateTask(body: TaskForm, id) {
    return this.http.put(baseURL + TASK_ENPOINT.UPDATE_TASK + id, body);
  }
  delete(id: string) {
    return this.http.delete(baseURL + TASK_ENPOINT.DELETE_TASK + id);
  }
}
