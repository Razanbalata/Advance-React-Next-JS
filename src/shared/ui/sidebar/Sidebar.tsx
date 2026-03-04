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

  return (
    // استخدام bg-card-bg يجعله يتحول للأبيض في اللايت مود والرمادي الغامق في الدارك مود
    // أو يمكنك استخدام dark:bg-slate-950 ليبقى غامقاً دائماً لكن بدرجات مختلفة
    <div className="w-64 min-h-screen bg-card-bg border-r border-card-border p-6 transition-colors duration-300">
      <h3 className="text-xl font-bold mb-8 border-b border-card-border pb-4 text-brand-blue">
        Dashboard
      </h3>

      <ul className="flex flex-col gap-2">
        {filteredItems.map((item) => {
          const isActive = pathname === item.path;

          if (item.path) {
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={`block p-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" 
                      : "text-text-muted hover:bg-info-card hover:text-brand-blue"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.label}>
              <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full text-left p-3 rounded-xl font-medium transition-all duration-200 ${
                  item.label === "Logout" 
                    ? "text-brand-red hover:bg-brand-red/10" 
                    : "text-text-muted hover:bg-info-card hover:text-brand-blue"
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