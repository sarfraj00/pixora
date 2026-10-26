const RegisterFooter = () => {
  return (
    <footer
      className="
        relative
        z-40
        flex
        min-h-16
        items-center
        px-6
        pb-5
        lg:px-12
        xl:px-16
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
          text-xs
          text-white/65
        "
      >
        <span>© 2026 Pixora</span>

        <span className="text-white/20">
          |
        </span>

        <button className="transition hover:text-white">
          About
        </button>

        <span className="text-white/20">
          |
        </span>

        <button className="transition hover:text-white">
          Privacy
        </button>

        <span className="text-white/20">
          |
        </span>

        <button className="transition hover:text-white">
          Terms
        </button>

        <span className="text-white/20">
          |
        </span>

        <button className="transition hover:text-white">
          Help
        </button>
      </div>
    </footer>
  );
};

export default RegisterFooter;