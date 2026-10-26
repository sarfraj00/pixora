const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  error,
  required = true,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="
          block
          text-sm
          font-medium
          text-white
        "
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={19}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-white/55
          "
        />

        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`
            h-14
            w-full
            rounded-xl
            border
            bg-white/3
            pl-12
            pr-4
            text-sm
            text-white
            outline-none
            transition-all
            duration-200
            placeholder:text-white/40

            ${
              error
                ? "border-red-400/70 focus:ring-2 focus:ring-red-500/20"
                : "border-white/15 hover:border-white/25 focus:border-violet-500 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/20"
            }
          `}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;