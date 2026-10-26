import {
  Bookmark,
  Home,
  User,
  PlusIcon,
  Settings
} from "lucide-react";
import { memo } from "react";

const MobileBottomNav = memo(({
  handleOpen,
  activePage = "Home",
  onNavigate,
}) => {
  const items = [
    {
      name: "Home",
      icon: Home,
    },

    {
      name: "Saved",
      icon: Bookmark,
    },
    {
      name: "Create",
      icon: PlusIcon,
    },

    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Profile",
      icon: User,
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-white/8
        bg-[#070612]/90
        px-3
        py-2
        backdrop-blur-xl
        lg:hidden
      "
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            activePage === item.name;
          if (item.name === "Create") {
            return (
              <button
                key={item.name}
                onClick={handleOpen}
                className={`
                flex
                flex-col
                items-center
                gap-1
                rounded-xl
                px-4
                py-2
                ${active
                    ? "text-violet-400"
                    : "text-white/35"
                  }
              `}
              >
                <Icon size={20} />

                <span className="text-[10px]">
                  {item.name ===
                    "Notifications"
                    ? "Alerts"
                    : item.name}
                </span>
              </button>
            );
          }
          return (
            <button
              key={item.name}
              onClick={() =>
                onNavigate?.(item.name.toLowerCase())
              }
              className={`
                flex
                flex-col
                items-center
                gap-1
                rounded-xl
                px-4
                py-2
                ${active
                  ? "text-violet-400"
                  : "text-white/35"
                }
              `}
            >
              <Icon size={20} />

              <span className="text-[10px]">
                {item.name ===
                  "Notifications"
                  ? "Alerts"
                  : item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default MobileBottomNav;