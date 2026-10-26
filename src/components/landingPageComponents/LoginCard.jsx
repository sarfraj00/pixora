import { useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LoaderCircle,
  ArrowRight,
} from "lucide-react";

import SocialLoginButton from "./SocialLoginButton";
import { api } from "../../config/axios";
import { toast } from 'react-toastify'

import { handleGoogleLogin } from "../../utils/handleGoogleLogin";
import { setAccessToken } from '../../config/axios.js'
import { useNavigate } from 'react-router-dom'

const LoginCard = ({
  onForgotPassword,
  onCreateAccount,

}) => {
  const [showPassword, setShowPassword] =
    useState(false);
  const navigate = useNavigate()

  const [loading, setLoading] =
    useState(false);

  const [socialLoading, setSocialLoading] =
    useState(null);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.identifier.trim() ||
      !form.password.trim()
    ) {
      toast.error(
        "Please enter your email and password."
      );

      return;
    }
    setLoading(true);
    try {
      const { password, identifier: emailOrUsername } = form;
      const res = await api.post('/auth/signin', { emailOrUsername, password });
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setAccessToken(res?.data?.accessToken);
        navigate('/home')
      }
    }
    catch (err) {
     
        toast.error(err?.response?.data?.message || 'something went wrong! please try again');
  
    }
    finally {
      setLoading(false)
    }
  };

  const handleSocialLogin = async () => {
    const accessToken = await handleGoogleLogin();
    if (accessToken) {
      setAccessToken(accessToken)
      navigate('/home')
    };
  }

  return (
    <div
      className="
        relative z-40
        w-full max-w-127.5
        justify-self-end
        rounded-3xl
        border border-white/15
        bg-inherit
        p-6
        shadow-2xl
        shadow-black/40
        backdrop-blur-2xl
        sm:p-9
      "
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Welcome to{" "}
          <span className="text-violet-400">
            Pixora
          </span>{" "}
          👋
        </h2>

        <p className="mt-2 text-sm text-white/55">
          Log in to continue to your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Email */}

        <div className="relative">
          <Mail
            size={19}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            type="text"
            placeholder="Email or Username"
            autoComplete="username"
            className="
              h-14 w-full
              rounded-xl
              border border-white/15
              bg-white/5
              pl-12 pr-4
              text-sm text-white
              outline-none
              transition
              placeholder:text-white/35
              hover:border-white/25
              focus:border-violet-500
              focus:bg-violet-500/5
              focus:ring-2
              focus:ring-violet-500/20
            "
          />
        </div>

        {/* Password */}

        <div className="relative">
          <LockKeyhole
            size={19}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            autoComplete="current-password"
            className="
              h-14 w-full
              rounded-xl
              border border-white/15
              bg-white/5
              pl-12 pr-12
              text-sm text-white
              outline-none
              transition
              placeholder:text-white/35
              hover:border-white/25
              focus:border-violet-500
              focus:bg-violet-500/5
              focus:ring-2
              focus:ring-violet-500/20
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (prev) => !prev
              )
            }
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-white/40
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

        {/* Forgot */}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="
              text-xs font-medium
              text-violet-400
              transition
              hover:text-violet-300
              hover:underline
            "
          >
            Forgot password?
          </button>
        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex h-14 w-full
            items-center justify-center
            gap-2
            rounded-xl
            bg-linear-to-r
            from-violet-600
            to-fuchsia-500
            font-semibold
            text-white
            shadow-lg
            shadow-violet-600/20
            transition
            hover:-translate-y-0.5
            hover:brightness-110
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? (
            <>
              <LoaderCircle
                size={19}
                className="animate-spin"
              />

              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />

        <span className="text-xs text-white/40">
          or
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social */}

      <div className="space-y-3">
        <SocialLoginButton
          provider="google"
          loading={
            socialLoading === "google"
          }
          onClick={() =>
            handleSocialLogin("google")
          }
        />


      </div>

      {/* Register */}

      <div
        className="
          mt-6 border-t border-white/10
          pt-6 text-center
        "
      >
        <span className="text-sm text-white/50">
          New to Pixora?{" "}
        </span>

        <button
          type="button"
          onClick={onCreateAccount}
          className="
            inline-flex items-center gap-1
            text-sm font-semibold
            text-violet-400
            transition
            hover:text-violet-300
          "
        >
          Create an account
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default LoginCard;