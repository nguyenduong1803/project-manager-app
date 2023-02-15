import { TypeUser } from "./../types/user.type";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { ADMIN_ROUTER } from "app/constants/adminRouter";
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  privateRole: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: ADMIN_ROUTER.DASHBOARD,
    title: "Dashboard",
    icon: "nc-bank",
    class: "",
    privateRole: false,
  },
  {
    path: ADMIN_ROUTER.PROFILE,
    title: "Profile",
    icon: "nc-single-02",
    class: "",
    privateRole: false,
  },
  {
    path: ADMIN_ROUTER.PROJECTS,
    title: "Projects",
    icon: "nc-calendar-60",
    class: "",
    privateRole: false,
  },
  {
    path: ADMIN_ROUTER.TABLE,
    title: "User list",
    icon: "nc-tile-56",
    class: "",
    privateRole: true,
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  user: TypeUser;
  constructor(private auth: AuthService) {
    this.user = this.auth.user;
  }
  ngOnInit() {
    console.log(this.auth);
    this.menuItems = ROUTES.filter((menu) => {
      if (menu.privateRole === false && this.user.isAdmin === false) {
        return menu;
      } else if (this.user.isAdmin === true) {
        return menu;
      }
      return false;
    });
  }
}
