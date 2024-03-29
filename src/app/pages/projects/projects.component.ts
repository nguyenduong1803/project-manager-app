import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ADMIN_ROUTER } from "app/constants/adminRouter";
import { AuthService } from "app/services/auth.service";
import { ProjectForm, ProjectService } from "app/services/project.service";
import { TcommonResponse } from "app/types/commonRespone";
import { TProject } from "app/types/project.type";
import { TypeUser } from "app/types/user.type";
import Swal from "sweetalert2";

@Component({
  selector: "projects",
  templateUrl: "./projects.component.html",
})
export class ProjectsComponent implements OnInit {
  router = ADMIN_ROUTER;
  projectList: TProject[];
  modalShow: boolean = false;
  idEdit: string;
  user: TypeUser;
  form = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    teamSize: new FormControl(0),
    dateOfStart: new FormControl(""),
  });
  constructor(
    private projectService: ProjectService,
    private auth: AuthService
  ) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {
    this.projectService
      .getAll()
      .subscribe(async (data: TcommonResponse<TProject[]>) => {
        this.projectList = data.data;
      });
  }
  onSubmit() {
    const form = this.form.value as ProjectForm;
    console.log(form);
    // when add
    !Boolean(this.idEdit) &&
      this.projectService
        .addProject(form)
        .subscribe(async (data: { data: TProject; message: string }) => {
          this.modalShow = false;
          this.projectList.push(data.data);
          await Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    // when edditing
    Boolean(this.idEdit) &&
      this.projectService.updateProject(form, this.idEdit).subscribe(
        async (data: { project: TProject }) => {
          this.modalShow = false;
          const index = this.projectList.findIndex(
            (project) => project._id === this.idEdit
          );
          this.projectList[index] = data.project;

          await Swal.fire({
            icon: "success",
            title: "Update thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          this.idEdit = "";
        },
        () => {
          this.idEdit = "";
          this.modalShow = false;
          Swal.fire({
            icon: "success",
            title: "Update thất bại",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
  handleEdit(id: string) {
    const project = this.projectList.find((project) => project._id === id);
    this.form.reset(project);
    this.modalShow = true;
    this.idEdit = id;
  }
  handleDetele(id: string) {
    this.projectService.removeProject(id).subscribe(
      async () => {
        this.projectList = this.projectList.filter(
          (project) => project._id !== id
        );
        await Swal.fire({
          icon: "success",
          title: "Remove thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      () => {
        Swal.fire({
          icon: "success",
          title: "Update thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
