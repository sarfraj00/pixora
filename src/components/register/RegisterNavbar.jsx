import { LogIn } from "lucide-react";
import PixoraLogo from "./PixoraLogo";

const RegisterNavbar = ({ onLogin }) => {
  return (
    <header className="relative z-50">
      <nav
        className="
          mx-auto
          flex
          h-24
          max-w-[1600px]
          items-center
          justify-between
          px-6
          lg:px-12
          xl:px-16
        "
      >
        <PixoraLogo />

        <div className="flex items-center gap-4">
          <span
            className="
              hidden
              text-sm
              text-white/75
              sm:block
            "
          >
            Already have an account?
          </span>

          <button
            type="button"
            onClick={onLogin}
            className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-fuchsia-500/70
              bg-fuchsia-500/5
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:border-fuchsia-400
              hover:bg-fuchsia-500/15
              hover:shadow-lg
              hover:shadow-fuchsia-500/10
            "
          >
            <LogIn
              size={17}
              className="
                transition-transform
                group-hover:-translate-x-0.5
              "
            />

            Log In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default RegisterNavbar;