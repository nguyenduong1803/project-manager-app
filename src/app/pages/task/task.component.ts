import { AuthService } from "app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "app/services/task.service";
import { TcommonResponse } from "app/types/commonRespone";
import { TTask } from "app/types/task.type";
import Swal from "sweetalert2";
import { TypeUser } from "app/types/user.type";

@Component({
  selector: "task",
  templateUrl: "./task.component.html",
})
export class TaskComponent implements OnInit {
  taskList: TTask[] = [];
  projectId: string = "";
  user: TypeUser;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private auth: AuthService
  ) {
    this.user = this.auth.user;
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("id");
    this.taskService
      .getAll(this.projectId)
      .subscribe(async (data: TcommonResponse<TTask[]>) => {
        console.log(data);
        data.data.forEach((task) => {
          this.taskList.push(task);
        });
      });
    console.log("user: ", this.user);
  }
  handleGetTask(status) {
    return this.taskList.filter((task) => task.status === status);
  }
  handleDelete(id) {
    this.taskService.delete(id).subscribe(
      async () => {
        this.taskList = this.taskList.filter((task) => task._id !== id);
        await Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      async () => {
        await Swal.fire({
          icon: "error",
          title: "Xóa thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  handleChangStatus(e, id) {
    const task = this.taskList.find((task) => task._id === id);
    task.status = parseFloat(e.target.value);
    this.taskService.updateTask(task, id).subscribe(async () => {
      this.taskList.forEach((task) => {
        if (task._id === id) {
          task.status = parseFloat(e.target.value);
        }
      });
      await Swal.fire({
        icon: "success",
        title: "update Thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
