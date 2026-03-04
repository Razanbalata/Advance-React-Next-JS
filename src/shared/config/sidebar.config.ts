export type Role = "user" | "admin";

export interface SidebarItem {
  label: string;
  roles: Role[];
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Home",
    roles: ["user", "admin"],
  },
  {
    label: "Profile",
    roles: ["user", "admin"],
  },
  {
    label: "Change Password",
    roles: ["user", "admin"],
  },
  {
    label: "View Users",
    roles: ["admin"], // 👑 بس الادمن
  },
  {
    label: "Logout",
    roles: ["user", "admin"],
  },
];