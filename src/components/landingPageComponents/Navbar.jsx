import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "./BrandLogo";


const Navbar = ({  onSignUp }) => {
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

       
        <div className=" items-center gap-5 flex">
          <span className="text-sm text-white/70 hidden md:block">
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

        
        </div>
      </nav>

    
    </header>
  );
};

export default Navbar;