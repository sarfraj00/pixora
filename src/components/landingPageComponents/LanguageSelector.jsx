import { Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

const languages = [
  "English",
  "Hindi",
  "Punjabi",
];

const LanguageSelector = () => {
  const [open, setOpen] =
    useState(false);

  const [language, setLanguage] =
    useState("English");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          flex items-center gap-2
          text-white/70
          transition
          hover:text-white
        "
      >
        <Globe size={16} />

        <span className="text-xs">
          {language}
        </span>

        <ChevronDown
          size={14}
          className={`
            transition
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute bottom-8 right-0
            w-32
            overflow-hidden
            rounded-xl
            border border-white/10
            bg-[#171129]
            p-1
            shadow-2xl
          "
        >
          {languages.map((item) => (
            <button
              key={item}
              onClick={() => {
                setLanguage(item);
                setOpen(false);
              }}
              className="
                w-full rounded-lg
                px-3 py-2
                text-left text-xs
                text-white/70
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;