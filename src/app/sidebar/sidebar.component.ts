import { TypeUser } from "./../types/user.type";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { ADMIN_ROUTER } from "app/constants/adminRouter";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: ADMIN_ROUTER.DASHBOARD,
    title: "Dashboard",
    icon: "nc-bank",
    class: "",
  },
  {
    path: ADMIN_ROUTER.GROUP_INFOMATION,
    title: "Group Information",
    icon: "nc-single-02",
    class: "",
  },
  {
    path: ADMIN_ROUTER.PROJECTS,
    title: "Projects",
    icon: "nc-calendar-60",
    class: "",
  },
  {
    path: ADMIN_ROUTER.TABLE,
    title: "Table List",
    icon: "nc-tile-56",
    class: "",
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  user: TypeUser;
  constructor(private auth: AuthService) {
    this.user = this.auth.user;
  }
  ngOnInit() {
    console.log(this.auth);
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
