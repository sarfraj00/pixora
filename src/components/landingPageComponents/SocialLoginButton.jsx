import { LoaderCircle } from "lucide-react";
const SocialLoginButton = ({
  provider,
  loading,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="
        group flex h-13 w-full
        items-center justify-center gap-3
        rounded-xl
        bg-white
        font-medium text-neutral-900
        transition
        hover:-translate-y-0.5
        hover:bg-neutral-100
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <LoaderCircle
          size={19}
          className="animate-spin"
        />
      ) : (
        <>
          <span
            className="
              grid size-6 place-items-center
              font-bold
            "
          >
            {provider === "google" ? (
              <span className="text-[#4285F4]">
                G
              </span>
            ) : (
              <span className="text-black">
                
              </span>
            )}
          </span>

          Continue with{" "}
          {provider === "google"
            ? "Google"
            : "Apple"}
        </>
      )}
    </button>
  );
};

export default SocialLoginButton;