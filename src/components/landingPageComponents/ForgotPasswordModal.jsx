import {
  ArrowLeft,
  Loader,
  LoaderCircle,
  LoaderCircleIcon,
  Mail,
  X,
} from "lucide-react";
import { lazy, useState } from "react";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const OTPVerification = lazy(()=>import('../forgotPassword/OTPVerification'))

const ForgotPasswordModal = ({
  open,
  onClose,
}) => {
  if (!open) return null;
  const [loading, setLoading] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post('/forgot-password/send-otp', { emailOrUsername });

      if (res.status === 200) {
        toast.success(res?.data?.message);
        sessionStorage.setItem('user-data', JSON.stringify(res.data.user));
        navigate('/forgot-password/new-password-setup');
  
      }
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || 'something went wrong! please try again.');
        return;
      }
      toast('unexpected error!');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-black/70
        p-5
        backdrop-blur-md
      "
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) =>
          e.stopPropagation()
        }
        className="
          relative w-full max-w-md
          rounded-3xl
          border border-white/10
          bg-[#171129]
          p-7
          shadow-2xl
        "
      >
        <button
          onClick={onClose}
          className="
            absolute right-5 top-5
            grid size-9 place-items-center
            rounded-full
            bg-white/5
            text-white/60
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        <div
          className="
            mb-5 grid size-12
            place-items-center
            rounded-xl
            bg-violet-500/15
            text-violet-300
          "
        >
          <Mail />
        </div>

        <h2 className="text-2xl font-bold text-white">
          Forgot your password?
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/55">
          Enter your email or username and we'll send you
          an OTP to reset your password.
        </p>

        <input
          type="email"
          placeholder="email or username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="
            mt-6 h-13 w-full
            rounded-xl
            border border-white/10
            bg-white/5
            px-4
            text-white
            outline-none
            placeholder:text-white/35
            focus:border-violet-500
            focus:ring-2
            focus:ring-violet-500/20
          "
        />

        <button
          onClick={handleSendOtp}
          className="
            mt-4 flex h-13 w-full
            items-center justify-center gap-2
            rounded-xl
            bg-linear-to-r
            from-violet-600
            to-fuchsia-500
            font-semibold
            text-white
            cursor-pointer
            transition
            hover:brightness-110
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
          disabled={loading}
        >
          {loading ? <> <LoaderCircle className="animate-spin" /> Sending OTP... </> : "Send OTP"}

        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;