import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button
      type="button"
      onClick={() => setDark((prev) => !prev)}
      aria-label="Toggle theme"
      className="
        group flex size-10 items-center justify-center
        rounded-full
        border border-white/15
        bg-white/5
        text-white/80
        backdrop-blur-md
        transition
        hover:bg-white/10
        hover:text-white
      "
    >
      {dark ? (
        <Sun
          size={18}
          className="transition-transform group-hover:rotate-45"
        />
      ) : (
        <Moon
          size={18}
          className="transition-transform group-hover:-rotate-12"
        />
      )}
    </button>
  );
};

export default ThemeToggle;