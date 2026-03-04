export type Role = "user" | "admin";

export const sidebarItems = [
  { label: "Home", path: "/user", roles: ["user", "admin"] },
  { label: "Profile", path: "/profile", roles: ["user", "admin"] },
  { label: "Change Password", roles: ["user", "admin"] }, // بدون path لأنه مودال
  { label: "View Users", path: "/usersTable", roles: ["admin"] },
];