import { CheckCircle, X } from "lucide-react";

const Toast = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div
      className="
        fixed right-5 top-5 z-200
        flex max-w-sm items-center gap-3
        rounded-2xl
        border border-white/10
        bg-[#171129]/95
        px-4 py-3
        text-sm text-white
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <CheckCircle
        size={19}
        className="shrink-0 text-emerald-400"
      />

      <span>{message}</span>

      <button
        onClick={onClose}
        className="ml-auto text-white/40 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;