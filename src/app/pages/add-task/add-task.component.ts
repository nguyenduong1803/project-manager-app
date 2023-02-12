import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { TaskForm, TaskService } from "app/services/task.service";
import { TTask } from "app/types/task.type";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "add-task",
  templateUrl: "./add-task.component.html",
})
export class AddTaskComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    assign: new FormControl("No Assign"),
    status: new FormControl(1),
    projectId: new FormControl(""),
  });
  constructor(
    private projectService: TaskService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get("id");
    this.form.patchValue({ projectId: projectId });
  }
  onSubmit() {
    const form = this.form.value as TaskForm;
    this.projectService.addTask(form).subscribe(
      async (data: { data: TTask; message: string }) => {
        await Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      async () => {
        await Swal.fire({
          icon: "error",
          title: "Thêm Task Thất Bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
    this.location.back();
  }
}
