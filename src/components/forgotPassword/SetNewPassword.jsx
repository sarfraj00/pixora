import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { api } from "../../config/axios";
import { toast } from "react-toastify";
import axios from "axios";
import PasswordUpdated from "./PasswordUpdated";

const SetNewPassword = ({
  onBack,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [status, setStatus] = useState('');

  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passwordIsValid =
    requirements.every(
      (requirement) => requirement.valid
    );

  const passwordsMatch =
    password.length > 0 &&
    password === confirmPassword;



  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = sessionStorage.getItem('user-data');
    if (!user) return;
    setError("");

    if (!passwordIsValid) {
      setError(
        "Please meet all password requirements."
      );
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.patch('/forgot-password/set-new-password', { newPassword: password, confirmPassword }, {
        headers
          : { 'x-custom-user-data': user }
      });
      if (res.status === 201) {
        toast.success(res?.data?.message);
        setStatus('updated')
        sessionStorage.removeItem('user-data');
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        return;
      }
      toast.error(
        "Password updation failed.",     
      );

      setError(
        "Unable to update your password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'updated') {
    return <main><PasswordUpdated /></main>
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
          max-w-155
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
            overflow-hidden
            rounded-[30px]
            border
            border-violet-900
            bg-[#0c0925]/25
            p-7
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
            sm:p-10
          "
        >


          <div className="flex justify-center">
            <div
              className="
                relative
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
              <LockKeyhole
                size={42}
                strokeWidth={1.6}
                className="text-violet-300"
              />

              <div
                className="
                  absolute
                  -right-1
                  bottom-0
                  grid
                  size-8
                  place-items-center
                  rounded-full
                  border-2
                  border-[#0c0925]
                  bg-violet-500
                "
              >
                <KeyRound
                  size={14}
                  className="text-white"
                />
              </div>
            </div>
          </div>


          <div className="mt-8 text-center">
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
                  from-violet-300
                  via-fuchsia-400
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
              >
                Set a new password
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-base
                leading-7
                text-white/50
              "
            >
              Create a strong password to
              keep your Pixora account secure.
            </p>
          </div>


          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >


            <div>
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-white/75
                "
              >
                New password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                  "
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                    );
                    setError("");
                  }}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/3
                    px-12
                    pr-12
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition
                    focus:border-violet-400/60
                    focus:bg-violet-500/5
                    focus:ring-4
                    focus:ring-violet-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                    transition
                    hover:text-white
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>



            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-white/75
                "
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                  "
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value
                    );
                    setError("");
                  }}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  className={`
                    h-14
                    w-full
                    rounded-xl
                    border
                    bg-white/3
                    px-12
                    pr-12
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition
                    focus:bg-violet-500/5
                    focus:ring-4
                    focus:ring-violet-500/10
                    ${confirmPassword &&
                      !passwordsMatch
                      ? "border-red-400/50 focus:border-red-400/60 focus:ring-red-500/10"
                      : confirmPassword &&
                        passwordsMatch
                        ? "border-emerald-400/50 focus:border-emerald-400/60"
                        : "border-white/10 focus:border-violet-400/60"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                    transition
                    hover:text-white
                  "
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>



            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-white/3
                p-5
              "
            >
              <p
                className="
                  mb-4
                  text-sm
                  font-medium
                  text-white/70
                "
              >
                Password requirements
              </p>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                {requirements.map(
                  (requirement) => (
                    <div
                      key={requirement.label}
                      className="
                        flex
                        items-center
                        gap-2.5
                      "
                    >
                      <div
                        className={`
                          grid
                          size-5
                          shrink-0
                          place-items-center
                          rounded-full
                          border
                          transition-all
                          ${requirement.valid
                            ? "border-emerald-400 bg-emerald-400"
                            : "border-white/15 bg-white/5"
                          }
                        `}
                      >
                        {requirement.valid && (
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-black"
                          />
                        )}
                      </div>

                      <span
                        className={`
                          text-xs
                          transition-colors
                          ${requirement.valid
                            ? "text-emerald-300"
                            : "text-white/40"
                          }
                        `}
                      >
                        {requirement.label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Error */}

            {error && (
              <p
                className="
                  mt-4
                  text-center
                  text-sm
                  text-red-400
                "
              >
                {error}
              </p>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
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
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Updating password...
                </>
              ) : (
                <>
                  <ShieldCheck size={19} />

                  Update Password
                </>
              )}
            </button>
          </form>


          <button
            type="button"
            onClick={onBack}
            className="
              mx-auto
              mt-7
              flex
              items-center
              gap-2
              text-sm
              text-white/40
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={16} />

            Back to login
          </button>

          {/* Security */}

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
              className="text-violet-400/70"
            />

            <span
              className="
                text-xs
                text-white/30
              "
            >
              Your password is securely encrypted
            </span>
          </div>
        </div>

        {/* Footer */}

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

export default SetNewPassword;