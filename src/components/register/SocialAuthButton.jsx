import { LoaderCircle } from "lucide-react";

const SocialAuthButton = ({
  provider,
  loading,
  onClick,
}) => {
  const isGoogle = provider === "google";

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        border
        border-white/15
        bg-white/2
        font-medium
        text-white
        transition-all
        duration-200
        hover:border-white/30
        hover:bg-white/6
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <LoaderCircle
          size={19}
          className="animate-spin"
        />
      ) : isGoogle ? (
        <span
          className="
            text-xl
            font-bold
            text-[#4285F4]
          "
        >
          G
        </span>
      ) : (
        <span className="text-xl">
          
        </span>
      )}

      <span>
        Continue with{" "}
        {isGoogle ? "Google" : "Apple"}
      </span>
    </button>
  );
};

export default SocialAuthButton;