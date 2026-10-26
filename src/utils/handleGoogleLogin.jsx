import axios from "axios";
import { api } from "../config/axios.js";
import { googleAuth } from "../services/firebase.js";
import { toast } from "react-toastify";


export const handleGoogleLogin = async () => {

  try {
    const user = await googleAuth();
    const accessToken = user.accessToken;
    const res = await api.post('/auth/google-auth', { accessToken });
    if (res.status === 200 || res.status === 201) {
      toast.success(res?.data?.message)
      return res?.data?.accessToken;
    }
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
      return;
    }

  }
}