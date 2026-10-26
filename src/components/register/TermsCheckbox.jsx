import { Check } from "lucide-react";

const TermsCheckbox = ({
  checked,
  onChange,
  error,
}) => {
  return (
    <div>
      <label
        className="
          flex
          cursor-pointer
          items-start
          gap-3
          select-none
        "
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
          className="sr-only"
        />

        <span
          className={`
            mt-0.5
            grid
            size-6
            shrink-0
            place-items-center
            rounded-md
            border
            transition-all

            ${
              checked
                ? "border-violet-500 bg-violet-600"
                : "border-white/25 bg-white/5"
            }
          `}
        >
          {checked && (
            <Check
              size={15}
              strokeWidth={3}
              className="text-white"
            />
          )}
        </span>

        <span
          className="
            text-sm
            leading-6
            text-white/65
          "
        >
          I agree to the{" "}
          <button
            type="button"
            className="
              text-violet-400
              hover:text-violet-300
              hover:underline
            "
            onClick={(e) =>
              e.preventDefault()
            }
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="
              text-violet-400
              hover:text-violet-300
              hover:underline
            "
            onClick={(e) =>
              e.preventDefault()
            }
          >
            Privacy Policy
          </button>
        </span>
      </label>

      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default TermsCheckbox;