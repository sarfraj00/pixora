import {
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
  error,
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
        <LockKeyhole
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
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder={placeholder}
          required
          className={`
            h-14
            w-full
            rounded-xl
            border
            bg-white/3
            pl-12
            pr-12
            text-sm
            text-white
            outline-none
            transition-all

            ${
              error
                ? "border-red-400/70"
                : "border-white/15 hover:border-white/25 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              (previous) => !previous
            )
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-white/50
            transition
            hover:text-white
          "
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;