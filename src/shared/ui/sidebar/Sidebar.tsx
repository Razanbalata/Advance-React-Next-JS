import React from "react";
import { sidebarItems,Role } from "../../config/sidebar.config"; 

interface SidebarProps {
  role: Role;
}

function Sidebar({ role }: SidebarProps) {
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h3 className="text-xl font-bold mb-6">Dashboard</h3>

      <ul className="flex flex-col gap-4">
        {filteredItems.map((item) => (
          <li
            key={item.label}
            className="hover:text-gray-300 cursor-pointer"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;