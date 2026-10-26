import {
    Check,
    ArrowRight,
    LayoutDashboard,
    ShieldCheck,
    MailCheck,
    LoaderCircle
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import { api } from "../../config/axios";
import Error from '../Error.jsx'

import { setAccessToken } from "../../config/axios.js";
import { useNavigate } from "react-router-dom";

const VerificationSuccessCard = memo(({
    onContinue,
    onDashboard,
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
  
    const [error, setError] = useState('');
    const [status, setStatus] = useState('verifying');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            let res;
            try {
                const token = searchParams.get("token");
                if (!token) {
                    setError('invalid link');
                    return;
                }

                const res = await api.get(`/auth/email-verification?token=${token}`);
                if (res?.data?.success) {
                  setAccessToken(res?.data?.accessToken)
                    setStatus("success");
                    navigate('/home')
                    return;
                }
            }
            catch (err) {
            
                 setError(err?.response?.data?.message || 'something went wrong !');
                    return;
            }

        })();
    }, []);

    if (error) {
        return <div>
            <Error error={{ message: error }} />
        </div>
    }
    if (status === 'verifying') {
        return (
            <>
            <div
              className="
              relative
              mx-auto
              flex
              size-28
              items-center
              justify-center
            
              " 
                >
                    <div
                        className="
                absolute
                inset-0
                animate-spin
                rounded-full
                border-2
                border-transparent
                border-t-violet-400
                border-r-fuchsia-400
              "
                    />

                    <div
                        className="
                flex
                size-20
                items-center
                justify-center
                rounded-full
                border
                border-violet-900
                bg-violet-500/10
              "
                    >
                        <MailCheck
                            size={38}
                            className="text-violet-300"
                        />
                    </div>
                </div>

               

                <h1
                    className="
              mt-10
              text-center
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
                        Verifying your email
                    </span>
                </h1>

                <p
                    className="
              mx-auto
              mt-4
              max-w-md
              text-center
              text-base
              leading-7
              text-white/60
              sm:text-lg
            "
                >
                    Please wait while we verify your
                    email address. This should only
                    take a moment.
                </p>

           

                <div
                    className="
              mt-8
              flex
              items-center
              justify-center
              gap-2
              text-sm
              text-white/50
            "
                >
                    <LoaderCircle
                        size={17}
                        className="animate-spin"
                    />

                    Verifying...
                </div>
            </>
        );
    }

    if (status === "success") {
        return (
            <div
                className="
        relative
        w-full
        max-w-162.5
        overflow-hidden
        rounded-[30px]
        border
        border-violet-400/20
        bg-[#0c0925]/75
        p-7
        shadow-2xl
        shadow-black/50
        backdrop-blur-2xl
        sm:p-10
        lg:p-12
      "
            >
            

                <div
                    className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-40
          w-72
          -translate-x-1/2
          rounded-full
          bg-violet-600/15
          blur-[80px]
        "
                />

                <div className="relative z-10">
               

                    <div className="flex justify-center">
                        <div className="relative">


                            <div
                                className="
                absolute
                -inset-3
                rounded-full
                border
                border-violet-500/20
              "
                            />

                            <div
                                className="
                absolute
                -inset-5.5
                rounded-full
                border
                border-violet-500/10
              "
                            />

                          

                            <div
                                className="
                relative
                grid
                size-28
                place-items-center
                rounded-full
                border-4
                border-emerald-400
                bg-emerald-400/5
                shadow-[0_0_45px_rgba(52,211,153,0.25)]
              "
                            >
                                <Check
                                    size={58}
                                    strokeWidth={2.8}
                                    className="text-emerald-400"
                                />
                            </div>
                        </div>
                    </div>

                

                    <div className="mt-14 text-center">
                        <h1
                            className="
              bg-linear-to-r
              from-violet-400
              via-fuchsia-400
              to-pink-400
              bg-clip-text
              text-4xl
              font-extrabold
              tracking-tight
              text-transparent
              sm:text-5xl
            "
                        >
                            Email Verified!
                        </h1>

                        <p
                            className="
              mt-4
              text-base
              leading-7
              text-white/65
              sm:text-lg
            "
                        >
                            Your email has been successfully
                            verified.
                        </p>
                    </div>


                    <div
                        className="
            my-8
            h-px
            bg-linear-to-r
            from-transparent
            via-white/10
            to-transparent
          "
                    />

                

                    <div
                        className="
            flex
            items-center
            gap-5
          "
                    >
                        <div
                            className="
              grid
              size-12
              shrink-0
              place-items-center
              rounded-xl
              bg-violet-500/10
            "
                        >
                            <ShieldCheck
                                size={28}
                                className="text-violet-400"
                            />
                        </div>

                        <div>
                            <p
                                className="
                text-base
                font-medium
                text-white
              "
                            >
                                Your account is now active
                                and ready to use.
                            </p>

                            <p
                                className="
                mt-1
                text-sm
                text-white/50
              "
                            >
                                Thank you for being a part of
                                Pixora.
                            </p>
                        </div>
                    </div>

                  

                    <button
                        type="button"
                        onClick={onContinue}
                        className="
            group
            mt-9
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-linear-to-r
            from-violet-600
            via-fuchsia-600
            to-pink-500
            text-base
            font-semibold
            text-white
            shadow-lg
            shadow-violet-600/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:brightness-110
            hover:shadow-xl
            hover:shadow-fuchsia-500/20
            active:translate-y-0
          "
                    >
                        Continue to Pixora

                        <ArrowRight
                            size={21}
                            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
                        />
                    </button>


                    <button
                        type="button"
                        onClick={onDashboard}
                        className="
            mt-4
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
            text-base
            font-medium
            text-white/70
            transition-all
            duration-300
            hover:border-violet-400/30
            hover:bg-violet-500/5
            hover:text-white
          "
                    >
                        Go to Dashboard

                        <LayoutDashboard
                            size={19}
                        />
                    </button>
                </div>
            </div>
        );
    }
})
export default VerificationSuccessCard;