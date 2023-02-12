import { Routes } from "@angular/router";
import { ADMIN_ROUTER } from "app/constants/adminRouter";
import { AddTaskComponent } from "app/pages/add-task/add-task.component";
import { ProjectsComponent } from "app/pages/projects/projects.component";
import { TaskComponent } from "app/pages/task/task.component";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/project-detail/project-detail.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

export const AdminLayoutRoutes: Routes = [
  { path: ADMIN_ROUTER.DASHBOARD, component: DashboardComponent },
  { path: ADMIN_ROUTER.GROUP_INFOMATION, component: UserComponent },
  { path: ADMIN_ROUTER.TABLE, component: TableComponent },
  { path: ADMIN_ROUTER.TYPOGRAPHY, component: TypographyComponent },
  { path: ADMIN_ROUTER.ADD_TASK, component: AddTaskComponent },
  { path: ADMIN_ROUTER.PROJECTS, component: ProjectsComponent },
  { path: ADMIN_ROUTER.TASK, component: TaskComponent },
];
