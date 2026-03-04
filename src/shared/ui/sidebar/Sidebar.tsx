'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../../config/sidebar.config"; 
import { useSelector } from "react-redux";
import { RootType } from "@/src/core/providers/store";
import ChangePasswordDialog from "@/src/modules/user/ui/ChangePassDialog";
import { useState } from "react";


function Sidebar() {
  const user = useSelector((state: RootType) => state.auth.user);
  const pathname = usePathname();
  const currentRole = user?.role || "user";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(currentRole as any)
  );

  // الدوال الخاصة بالأزرار
  const handleAction = () => {
      setIsModalOpen(true)
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-8 border-b border-gray-700 pb-4">Dashboard</h3>

      <ul className="flex flex-col gap-2">
        {filteredItems.map((item) => {
          // إذا كان العنصر يحتوي على path، نجعله Link
          if (item.path) {
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`block p-3 rounded-lg transition-all ${
                    pathname === item.path ? "bg-teal-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          // إذا لم يحتوي على path، نجعله Button (مثل Logout و Change Password)
          return (
            <li key={item.label}>
              <button
                onClick={() => handleAction()}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  item.label === "Logout" ? "text-red-400 hover:bg-red-900/20" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      <ChangePasswordDialog
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default Sidebar;