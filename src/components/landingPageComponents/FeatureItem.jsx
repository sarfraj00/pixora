const FeatureItem = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group flex items-center gap-4
        transition duration-300
        hover:translate-x-2
      "
    >
      <div
        className="
          grid size-12 shrink-0 place-items-center
          rounded-full
          border border-white/10
          bg-violet-500/20
          text-violet-200
          shadow-lg shadow-violet-950/20
          transition
          group-hover:scale-110
          group-hover:bg-violet-500/30
        "
      >
        <Icon size={21} />
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;