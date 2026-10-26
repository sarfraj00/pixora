import { useEffect, useRef, useState, lazy } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    KeyRound,
    Mail,
    RefreshCw,
    ShieldCheck,
    XCircle,
} from "lucide-react";

import { api } from "../../config/axios.js";
import { toast } from "react-toastify";
import axios from "axios";

const SetNewPassword = lazy(() => import('./SetNewPassword.jsx'))
const OTP_LENGTH = 6;
const RESEND_TIME = 60;

const OTPVerification = ({
    email = "sarfraj@example.com",
    
}) => {
    const [otp, setOtp] = useState(
        Array(OTP_LENGTH).fill("")
    );
    
    const [timeLeft, setTimeLeft] =
        useState(RESEND_TIME);

    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const [isVerifying, setIsVerifying] =
        useState(false);

    const [status, setStatus] =
        useState("idle");

    const inputRefs = useRef([]);


    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((previous) =>
                previous - 1
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };


    const handleChange = (index, value) => {

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        if (value.length > 1) {
            const digits = value
                .replace(/\D/g, "")
                .slice(0, OTP_LENGTH);

            const updatedOtp =
                Array(OTP_LENGTH).fill("");

            digits.split("").forEach(
                (digit, i) => {
                    updatedOtp[i] = digit;
                }
            );

            setOtp(updatedOtp);

            const nextIndex = Math.min(
                digits.length,
                OTP_LENGTH - 1
            );

            inputRefs.current[
                nextIndex
            ]?.focus();

            return;
        }

        newOtp[index] = value;

        setOtp(newOtp);

        setStatus("idle");

        if (
            value &&
            index < OTP_LENGTH - 1
        ) {
            inputRefs.current[
                index + 1
            ]?.focus();
        }
    };


    const handleKeyDown = (
        index,
        event
    ) => {
        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[
                index - 1
            ]?.focus();
        }

        if (
            event.key === "ArrowLeft" &&
            index > 0
        ) {
            inputRefs.current[
                index - 1
            ]?.focus();
        }

        if (
            event.key === "ArrowRight" &&
            index < OTP_LENGTH - 1
        ) {
            inputRefs.current[
                index + 1
            ]?.focus();
        }
    };


    const handlePaste = (event) => {
        event.preventDefault();

        const pastedData =
            event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, OTP_LENGTH);

        if (!pastedData) return;

        const newOtp =
            Array(OTP_LENGTH).fill("");

        pastedData
            .split("")
            .forEach((digit, index) => {
                newOtp[index] = digit;
            });

        setOtp(newOtp);
        setStatus("idle");

        const focusIndex = Math.min(
            pastedData.length,
            OTP_LENGTH - 1
        );

        inputRefs.current[
            focusIndex
        ]?.focus();
    };


    const handleVerify = async () => {

        const user = sessionStorage.getItem('user-data');
        if (!user) return;
        const otpValue = otp.join("");

        if (otpValue.length !== OTP_LENGTH) {
            setStatus("error");
            return;
        }
        try {
            setIsVerifying(true);
            setStatus("idle");
            const res = await api.post('/forgot-password/verify-otp', { otp: otpValue }, { headers: { 'x-custom-user-data': user } })
            if (res.status === 200) {
                toast.success(res?.data?.message);
                sessionStorage.removeItem('user-data');
                sessionStorage.setItem('user-data', JSON.stringify(res?.data?.user))
                setIsOtpVerified(true);
                // navigate('/forgot-password/set-new-password')
            }
            setStatus("success");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message);
                return;
            }
            toast.error(
                "OTP verification failed:",
                error
            );
            setStatus("error");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (timeLeft > 0) return;

        try {
            setOtp(
                Array(OTP_LENGTH).fill("")
            );

            setStatus("idle");

            setTimeLeft(RESEND_TIME);

            inputRefs.current[0]?.focus();
            const userData = sessionStorage.getItem('user-data')
            const res = await api.get('/forgot-password/resend-otp', {
                headers: {
                    "x-custom-user-data": userData
                }
            })
            if (res.status === 200) toast.success(res?.data?.message)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message);
            }
            else {
                toast.error('somthing went wrong! please try again.')
            }
            setStatus("error");
        }
    };

    if (isOtpVerified) {
        return <div> <SetNewPassword /> </div>
    }

    if (status === "success") {
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
            rounded-[30px]
            border
            border-white/10
            bg-[#0c0925]/80
            p-8
            text-center
            shadow-2xl
            backdrop-blur-2xl
            sm:p-12
          "
                >
                    <div
                        className="
              mx-auto
              grid
              size-28
              place-items-center
              rounded-full
              border-4
              border-emerald-400
              bg-emerald-400/5
              shadow-[0_0_45px_rgba(52,211,153,0.2)]
            "
                    >
                        <CheckCircle2
                            size={60}
                            className="text-emerald-400"
                        />
                    </div>

                    <h1
                        className="
              mt-9
              text-4xl
              font-extrabold
              sm:text-5xl
            "
                    >
                        <span
                            className="
                bg-linear-to-r
                from-violet-400
                via-fuchsia-400
                to-pink-400
                bg-clip-text
                text-transparent
              "
                        >
                            OTP Verified!
                        </span>
                    </h1>

                    <p
                        className="
              mt-4
              text-base
              leading-7
              text-white/55
            "
                    >
                        Your verification was
                        successful. You can now
                        continue using Pixora.
                    </p>

                    <button
                        onClick={() =>
                            window.location.href = "/"
                        }
                        className="
              mt-8
              h-14
              w-full
              rounded-xl
              bg-linear-to-r
              from-violet-600
              via-fuchsia-600
              to-pink-500
              font-semibold
              shadow-lg
              shadow-violet-600/20
              transition
              hover:brightness-110
            "
                    >
                        Continue to Pixora
                    </button>
                </div>
            </main>
        );
    }


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
          max-w-162.5
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
              flex
              items-center
              gap-3
              justify-center
              
            "
                    >

                        <span
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
                        </span>
                    </a>
                </div>


                <div
                    className="
            rounded-[30px]
            border
            border-violet-900
            bg-[#0c0925]/55
            p-7
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
            sm:p-12
          "
                >


                    <div className="flex justify-center">
                        <div
                            className="
                grid
                size-24
                place-items-center
                rounded-full
                border
                border-violet-400/20
                bg-violet-500/10
                shadow-[0_0_45px_rgba(139,92,246,0.15)]
              "
                        >
                            <KeyRound
                                size={42}
                                strokeWidth={1.7}
                                className="text-violet-300"
                            />
                        </div>
                    </div>


                    <div className="mt-9 text-center">
                        <h1
                            className="
                text-4xl
                font-extrabold
                tracking-tight
                sm:text-5xl
              "
                        >
                            <span
                                className="
                  bg-linear-to-r
                  from-violet-400
                  via-fuchsia-400
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
                            >
                                Verify your account
                            </span>
                        </h1>

                        <p
                            className="
                mx-auto
                mt-4
                max-w-md
                text-base
                leading-7
                text-white/55
              "
                        >
                            Enter the 6-digit verification
                            code we sent to your email.
                        </p>
                    </div>

                    

                    <div
                        className="
              mx-auto
              mt-6
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/3
              px-4
              py-2
            "
                    >
                        <Mail
                            size={16}
                            className="text-violet-400"
                        />

                        <span
                            className="
                max-w-62.5
                truncate
                text-sm
                text-white/65
              "
                        >
                            {email}
                        </span>
                    </div>



                    <div
                        className="
              mt-9
              flex
              justify-center
              gap-2
              sm:gap-3
            "
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] =
                                        element;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                autoComplete={
                                    index === 0
                                        ? "one-time-code"
                                        : "off"
                                }
                                value={digit}
                                onChange={(event) =>
                                    handleChange(
                                        index,
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(
                                        index,
                                        event
                                    )
                                }
                                onPaste={handlePaste}
                                className={`
                  rounded-xl
                  border
                  bg-white/3
                  text-center
                  text-xl
                  font-bold
                  text-white
                  outline-none
                  transition-all
                  duration-200
                  sm:size-14
                  size-10
                  sm:text-2xl
                  ${status === "error"
                                        ? "border-red-400/60 bg-red-500/5"
                                        : "border-white/10 focus:border-violet-400/70 focus:bg-violet-500/5 focus:ring-4 focus:ring-violet-500/10"
                                    }
                `}
                            />
                        ))}
                    </div>

               

                    {status === "error" && (
                        <div
                            className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-red-400
              "
                        >
                            <XCircle size={17} />

                            <span>
                                Invalid or expired OTP.
                                Please try again.
                            </span>
                        </div>
                    )}



                    <div
                        className="
              mt-7
              flex
              items-center
              justify-center
              gap-2
              text-sm
            "
                    >
                        <Clock3
                            size={17}
                            className="text-violet-400"
                        />

                        {timeLeft > 0 ? (
                            <span className="text-white/45">
                                Resend code in{" "}
                                <span className="font-semibold text-white/75">
                                    {formatTime(timeLeft)}
                                </span>
                            </span>
                        ) : (
                            <span className="text-white/45">
                                Didn't receive the code?
                            </span>
                        )}
                    </div>


                    <button
                        type="button"
                        disabled={
                            isVerifying ||
                            otp.join("").length !==
                            OTP_LENGTH
                        }
                        onClick={handleVerify}
                        className="
              mt-7
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
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
            "
                    >
                        {isVerifying ? (
                            <>
                                <RefreshCw
                                    size={19}
                                    className="animate-spin"
                                />

                                Verifying...
                            </>
                        ) : (
                            <>
                                <ShieldCheck size={19} />

                                Verify OTP
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        disabled={timeLeft > 0}
                        onClick={handleResend}
                        className="
              mx-auto
              mt-6
              flex
              items-center
              gap-2
              text-sm
              font-medium
              transition
              disabled:cursor-not-allowed
              disabled:text-white/25
              enabled:text-violet-400
              enabled:hover:text-violet-300
            "
                    >
                        <RefreshCw size={16} />

                        Resend OTP
                    </button>


                    <button
                        type="button"
                        onClick={() => window.location.href = '/'}
                        className="
              mx-auto
              mt-7
              flex
              items-center
              gap-2
              text-sm
              text-white/35
              transition
              hover:text-white
            "
                    >
                        <ArrowLeft size={16} />

                        Go back
                    </button>


                    <div
                        className="
              mt-8
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
                            className="text-white/30"
                        />

                        <span
                            className="
                text-xs
                text-white/30
              "
                        >
                            Never share your OTP with anyone.
                        </span>
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

export default OTPVerification;