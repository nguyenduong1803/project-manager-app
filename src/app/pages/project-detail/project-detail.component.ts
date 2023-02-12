import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "app/services/project.service";
import { TcommonResponse } from "app/types/commonRespone";
import { TProject } from "app/types/project.type";
@Component({
  selector: "project-detail-cmp",
  moduleId: module.id,
  templateUrl: "project-detail.component.html",
})
export class UserComponent implements OnInit {
  project: TProject;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get("id");
    this.projectService
      .getById(projectId)
      .subscribe(async (data: TcommonResponse<TProject>) => {
        this.project = data.data;
      });
  }
  
}
