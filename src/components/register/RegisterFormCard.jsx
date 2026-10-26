import { useCallback, useState } from "react";

import {
  AtSign,
  LoaderCircle,
  Mail,
  UserRound,
  CheckCircle2,
  UserCheck,
  UserX,
  CircleXIcon
} from "lucide-react";

import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import DateOfBirthInput from "./DateOfBirthInput";
import TermsCheckbox from "./TermsCheckbox";
import SocialAuthButton from "./SocialAuthButton";
import { api } from "../../config/axios";
import axios from "axios";
import { toast } from 'react-toastify'
import { debounce } from "../../utils/debounce";
import { handleGoogleLogin } from "../../utils/handleGoogleLogin";
import { setAccessToken } from '../../config/axios.js'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

const RegisterFormCard = ({
  onLogin,
  showToast,
}) => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState('waiting')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] =
    useState(false);
  const navigate = useNavigate();
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);
  const dispatch = useDispatch();
  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [socialLoading, setSocialLoading] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const debouncedFunc = useCallback(
    debounce(async (username) => {
      if (!username) { setIsUsernameAvailable('waiting'); return; };
      if (
        !/^[a-zA-Z0-9_.]+$/.test(
          username
        )
      ) {

        setIsUsernameAvailable('not valid');
        return;
      }
      try {
        const res = await api.post('/auth/get-username-availability', { userName: username });
        if (res.status === 200) setIsUsernameAvailable('available')
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          setIsUsernameAvailable('not available');
          return;
        }
        setError('unexpected error', err)
      }
    }, 800)
    ,
    [],
  )


  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
    if (name === 'username') debouncedFunc(value);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Please enter your full name.";
    }

    if (!form.username.trim()) {
      newErrors.username =
        "Please choose a username.";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (form.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (
      form.confirmPassword !==
      form.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth =
        "Please select your date of birth.";
    }

    if (!acceptedTerms) {
      newErrors.terms =
        "You must accept the terms to continue.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUsernameAvailable === 'not available') {
      toast.error('this username is already taken');
      return;
    }

    if (!validate() || isUsernameAvailable === 'not valid') {
      toast.error(
        "Please fix the highlighted fields."
      );

      return;
    }

    setLoading(true);

    try {
      const { fullName, username, email, password, dateOfBirth } = form
      const res = await api.post('/auth/signup', { fullName, userName: username, email, password, dateOfBirth });
      if (res.status === 201) {
        toast.success(res?.data?.message);
      }

    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
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
  };

  return (
    <section
      className="
        relative
        z-30
        w-full
        max-w-190
        justify-self-end
      "
    >
      <div
        className="
          rounded-[28px]
          border
          border-white/15
          bg-[#111024]/5
          p-6
          shadow-2xl
          shadow-black/40
          backdrop-blur-2xl
          sm:p-8
          lg:p-10
        "
      >
        {/* Header */}

        <div className="mb-8">
          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Create your account
          </h2>

          <p
            className="
              mt-2
              text-base
              text-white/65
            "
          >
            Let's get you started on Pixora.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name + Username */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <FormInput
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={updateField}
              placeholder="Your name"
              icon={UserRound}
              error={errors.fullName}
            />

            <div>
              <FormInput
                label="Username"
                name="username"
                value={form.username}
                onChange={updateField}
                placeholder="Username"
                icon={AtSign}
                error={errors.username}
              />
              {isUsernameAvailable === 'available' && <div className="flex items-center gap-2 text-green-600">
                <UserCheck size={20} />
                <span>Username is available!</span>
              </div> || isUsernameAvailable === 'not available' && <div className="flex items-center gap-2 text-red-500">
                <UserX size={20} />
                <span>This Username is already taken!</span>
              </div> || isUsernameAvailable === 'not valid' && <div className="flex items-center gap-2 text-red-500">
                <CircleXIcon size={20} />
                <span>Only letters, numbers, dots and underscores are allowed.</span>
              </div>}
            </div>
          </div>

          {/* Email */}

          <div className="mt-5">
            <FormInput
              label="Email Address"
              name="email"
              value={form.email}
              onChange={updateField}
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email}
            />
          </div>

          {/* Passwords */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <PasswordInput
              label="Password"
              name="password"
              value={form.password}
              onChange={updateField}
              placeholder="Create a strong password"
              showPassword={showPassword}
              setShowPassword={
                setShowPassword
              }
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={updateField}
              placeholder="Confirm your password"
              showPassword={
                showConfirmPassword
              }
              setShowPassword={
                setShowConfirmPassword
              }
              error={errors.confirmPassword}
            />
          </div>

          {/* Date */}

          <div className="mt-5">
            <DateOfBirthInput
              value={form.dateOfBirth}
              onChange={updateField}
              name="dateOfBirth"
              error={errors.dateOfBirth}
            />
          </div>

          {/* Terms */}

          <div className="mt-6">
            <TermsCheckbox
              checked={acceptedTerms}
              onChange={setAcceptedTerms}
              error={errors.terms}
            />
          </div>

          {/* Create */}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-6
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
              hover:shadow-fuchsia-500/20
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

                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}

          <div
            className="
              my-7
              flex
              items-center
              gap-4
            "
          >
            <div className="h-px flex-1 bg-white/10" />

            <span
              className="
                text-sm
                text-white/50
              "
            >
              or continue with
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social */}

          <div
            className="
             flex justify-center
              gap-4
            
            "
          >
            <SocialAuthButton
              provider="google"
              loading={
                socialLoading === "google"
              }
              onClick={() =>
                handleSocialLogin()
              }
            />


          </div>
        </form>

        {/* Small security indicator */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            text-xs
            text-white/35
          "
        >
          <CheckCircle2
            size={14}
            className="text-emerald-400/70"
          />

          Your information is securely protected.
        </div>
      </div>

      {/* Mobile login */}

      <div className="mt-5 text-center lg:hidden">
        <span className="text-sm text-white/50">
          Already have an account?{" "}
        </span>

        <button
          type="button"
          onClick={onLogin}
          className="
            text-sm
            font-semibold
            text-violet-400
            hover:text-violet-300
          "
        >
          Log in
        </button>
      </div>
    </section>
  );
};

export default RegisterFormCard;