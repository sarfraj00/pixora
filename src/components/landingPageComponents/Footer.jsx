
import {NavLink} from 'react-router-dom'

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

        <NavLink className="transition hover:text-white" to="/about">
          About
        </NavLink>

        <NavLink className="transition hover:text-white" to="/privacy-policy">
          Privacy
        </NavLink>

        <NavLink className="transition hover:text-white" to="/terms">
          Terms
        </NavLink>

        <NavLink className="transition hover:text-white" to={'/help'}>
          Help
        </NavLink>
      </div>

  
    </footer>
  );
};

export default Footer;