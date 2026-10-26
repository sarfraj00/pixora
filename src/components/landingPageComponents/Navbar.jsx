import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ dark, setDark, onSignUp }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50">
      <nav
        className="
          mx-auto flex h-20 max-w-375
          items-center justify-between
          px-5 sm:px-8 lg:px-12
        "
      >
        <BrandLogo />

       
        <div className="hidden items-center gap-5 md:flex">
          <span className="text-sm text-white/70">
         {"Create a new account"}
          </span>

          <button
            onClick={onSignUp}
            className="
              rounded-xl
              border border-white/30
              bg-white/5
              px-5 py-2.5
              text-sm font-medium text-white
              backdrop-blur-md
              transition
              hover:border-violet-400
              hover:bg-violet-500/20
            "
          >
            Sign Up
          </button>

          <ThemeToggle
            dark={dark}
            setDark={setDark}
          />
        </div>

      
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="grid size-10 place-items-center rounded-xl bg-white/10 text-white md:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="
            absolute left-4 right-4 top-18.75
            rounded-2xl border border-white/10
            bg-[#171129]/95
            p-5 shadow-2xl backdrop-blur-xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-4">
            <button
              onClick={onSignUp}
              className="
                rounded-xl bg-linear-to-r
                from-violet-600 to-fuchsia-500
                py-3 font-semibold text-white
              "
            >
              Create account
            </button>

            <ThemeToggle
              dark={dark}
              setDark={setDark}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;