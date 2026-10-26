const RegisterFeature = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        transition-all
        duration-300
        hover:translate-x-2
      "
    >
      <div
        className="
          grid
          size-12
          shrink-0
          place-items-center
          rounded-full
          border
          border-violet-400/20
          bg-violet-700/30
          text-white
          shadow-lg
          shadow-violet-950/30
          backdrop-blur-md
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:border-violet-300/40
          group-hover:bg-violet-600/40
        "
      >
        <Icon size={22} />
      </div>

      <div>
        <h3
          className="
            text-base
            font-semibold
            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-white/70
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default RegisterFeature;