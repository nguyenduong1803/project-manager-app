import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./services/auth.guard";
export const AppRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/404",
  },
];
