import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

const Footer = ({ dark, setDark }) => {
  return (
    <footer
      className="
        relative z-40
        flex min-h-16
        flex-col items-center
        justify-between
        gap-4
        border-t border-white/10
        px-5 py-4
        text-xs text-white/45
        sm:flex-row
        sm:px-8
        lg:px-12
      "
    >
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        <span>© 2026 Pixora</span>

        <button className="transition hover:text-white">
          About
        </button>

        <button className="transition hover:text-white">
          Privacy
        </button>

        <button className="transition hover:text-white">
          Terms
        </button>

        <button className="transition hover:text-white">
          Help
        </button>
      </div>

      <div className="flex items-center gap-5">
        <LanguageSelector />

        <ThemeToggle
          dark={dark}
          setDark={setDark}
        />
      </div>
    </footer>
  );
};

export default Footer;