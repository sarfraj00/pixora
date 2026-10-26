import { CalendarDays } from "lucide-react";

const DateOfBirthInput = ({
  value,
  onChange,
  error,
}) => {
 
  return (
    <div className="space-y-2">
      <label
        htmlFor="dateOfBirth"
        className="
          block
          text-sm
          font-medium
          text-white
        "
      >
        Date of Birth
      </label>

      <div className="relative">
        <CalendarDays
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
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={value}
          onChange={onChange}
          required
          className={`
            h-14
            w-full
            appearance-none
            rounded-xl
            border
            bg-white/3
            px-12
            text-sm
            outline-none
            transition

            ${
              value
                ? "text-white"
                : "text-white/40"
            }

            ${
              error
                ? "border-red-400/70"
                : "border-white/15 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
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

export default DateOfBirthInput;