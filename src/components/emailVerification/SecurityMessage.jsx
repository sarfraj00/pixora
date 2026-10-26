import { LockKeyhole } from "lucide-react";


const SecurityMessage = () => {
    
    return (
        <div
            className="
        mt-8
        flex
        items-center
        justify-center
        gap-4
      "
        >
          

            <div
                className="
          grid
          size-14
          shrink-0
          place-items-center
          rounded-full
          border
          border-violet-400/30
          bg-violet-500/10
          shadow-lg
          shadow-violet-500/10
        "
            >
                <LockKeyhole
                    size={24}
                    className="text-violet-300"
                    strokeWidth={1.8}
                />
            </div>

          

            <div>
                <p
                    className="
            text-sm
            font-medium
            text-white
          "
                >
                    Secure. Private. Trusted.
                </p>

                <p
                    className="
            mt-1
            text-sm
            text-white/50
          "
                >
                    Your journey starts now.
                </p>
            </div>
        </div>
    );
};

export default SecurityMessage;