import {
    ArrowRight,
    Check,
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";

const PasswordUpdated = () => {

    return (
        <main
            className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#05031a]
        px-5
        py-10
        text-white
      "
        >

            <div
                className="
                  fixed inset-0
                  bg-cover bg-center
                  bg-no-repeat
                "

            />

            <div
                className="
                  fixed inset-0
                  bg-linear-to-r
                  from-[#090718]/99
                  via-[#110925]/99
                  to-[#100721]/99
                "
            />


            <div
                className="
                  fixed -left-40 top-1/3
                  size-125
                  rounded-full
                  bg-violet-600/10
                  blur-[130px]
                "
            />

            <div
                className="
                  fixed -right-40 bottom-0
                  size-125
                  rounded-full
                  bg-fuchsia-600/10
                  blur-[130px]
                "
            />


            <div
                className="
          relative
          z-10
          w-full
          max-w-150
        "
            >


                <div
                    className="
            mb-8
            flex
            justify-center
          "
                >
                    <a
                        href="/"
                        className="
              font-['Bodoni_Moda']
              text-5xl
              font-medium
              italic
              tracking-[-0.07em]
              text-white
              transition
              hover:text-zinc-300
            "
                    >
                        Pixora
                    </a>
                </div>

                <div
                    className="
            relative
            overflow-hidden
            rounded-4xl
            border
            border-violet-900
            bg-[#0c0925]/20
            p-8
            text-center
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
            sm:p-12
          "
                >


                    <div
                        className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              size-72
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-emerald-400/10
              blur-[90px]
            "
                    />

                    <div className="relative z-10">


                        <div
                            className="
                relative
                mx-auto
                flex
                size-32
                items-center
                justify-center
              "
                        >

                            <div
                                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-emerald-400/20
                "
                            />


                            <div
                                className="
                  absolute
                  inset-3
                  rounded-full
                  border
                  border-emerald-400/10
                "
                            />



                            <div
                                className="
                  relative
                  grid
                  size-20
                  place-items-center
                  rounded-full
                  border
                  border-emerald-400/30
                  bg-emerald-400/10
                  shadow-[0_0_50px_rgba(52,211,153,0.18)]
                "
                            >
                                <CheckCircle2
                                    size={46}
                                    strokeWidth={1.6}
                                    className="
                    text-emerald-400
                  "
                                />


                                <div
                                    className="
                    absolute
                    -right-1
                    -top-1
                    grid
                    size-7
                    place-items-center
                    rounded-full
                    border-2
                    border-[#0c0925]
                    bg-emerald-400
                  "
                                >
                                    <Check
                                        size={14}
                                        strokeWidth={3}
                                        className="text-[#062d1d]"
                                    />
                                </div>
                            </div>
                        </div>


                        <p
                            className="
                mt-8
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-emerald-400/80
              "
                        >
                            All set
                        </p>

                        <h1
                            className="
                mt-3
                text-4xl
                font-extrabold
                tracking-tight
                sm:text-5xl
              "
                        >
                            <span
                                className="
                  bg-linear-to-r
                  from-violet-300
                  via-fuchsia-400
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
                            >
                                Password updated
                            </span>
                        </h1>

                        <p
                            className="
                mx-auto
                mt-5
                max-w-md
                text-base
                leading-7
                text-white/50
              "
                        >
                            Your Pixora password has been
                            successfully changed. Your
                            account is now protected with
                            your new password.
                        </p>



                        <div
                            className="
                mx-auto
                mt-8
                flex
                max-w-md
                items-center
                gap-4
                rounded-2xl
                border
                border-emerald-400/10
                bg-emerald-400/4
                p-4
                text-left
              "
                        >
                            <div
                                className="
                  grid
                  size-11
                  shrink-0
                  place-items-center
                  rounded-xl
                  bg-emerald-400/10
                "
                            >
                                <LockKeyhole
                                    size={21}
                                    className="text-emerald-400"
                                />
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                    text-sm
                    font-semibold
                    text-white/80
                  "
                                >
                                    Password secured
                                </p>

                                <p
                                    className="
                    mt-1
                    text-xs
                    leading-5
                    text-white/35
                  "
                                >
                                    Your new password is ready
                                    to use.
                                </p>
                            </div>

                            <Check
                                size={19}
                                className="
                  ml-auto
                  shrink-0
                  text-emerald-400
                "
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => window.location.href = '/'}
                            className="
                group
                mt-8
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-linear-to-r
                from-violet-600
                via-fuchsia-600
                to-pink-500
                font-semibold
                text-white
                shadow-lg
                shadow-violet-600/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:brightness-110
                hover:shadow-xl
                active:translate-y-0
              "
                        >
                            Continue to Login

                            <ArrowRight
                                size={19}
                                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                            />
                        </button>


                        <div
                            className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-white/10
                pt-7
              "
                        >
                            <ShieldCheck
                                size={16}
                                className="
                  text-emerald-400/60
                "
                            />

                            <span
                                className="
                  text-xs
                  text-white/30
                "
                            >
                                Your account security matters
                                to us.
                            </span>
                        </div>
                    </div>
                </div>



                <p
                    className="
            mt-7
            text-center
            text-xs
            text-white/30
          "
                >
                    © 2026 Pixora. All rights reserved.
                </p>
            </div>
        </main>
    );
};

export default PasswordUpdated;