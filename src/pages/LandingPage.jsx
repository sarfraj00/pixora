import { memo, useEffect, useState } from "react";
import Navbar from "../components/landingPageComponents/Navbar.jsx"
import HeroSection from "../components/landingPageComponents/HeroSection.jsx";
import PhotoCollage from "../components/landingPageComponents/PhotoCollage.jsx";
import LoginCard from "../components/landingPageComponents/LoginCard.jsx";
import Footer from "../components/landingPageComponents/Footer.jsx";
import ForgotPasswordModal from "../components/landingPageComponents/ForgotPasswordModal.jsx";
import Toast from "../components/landingPageComponents/Toast.jsx";
import bgImage from '../assets/images/pixora_landing_bg.png'
import { useNavigate } from "react-router-dom";
import { api, setAccessToken } from "../config/axios.js";
import Loader from '../utils/Loader.jsx'

const LandingPage = memo(() => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/auth/regenerate-access-token');

        if (res.status === 200) {
          setAccessToken(res?.data?.accessToken);
          window.location.href = '/home';
        }
      }
      catch (err) {

      }
      finally {
        setLoading(false);
      }
    })()

  }, [])
  const [dark, setDark] = useState(true);

  const [forgotPasswordOpen, setForgotPasswordOpen] =
    useState(false);

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
  };


  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate('/signup')
  };

  const handleCreateAccount = () => {
    navigate('/signup')
  };

  if (loading) {
    return <Loader />
  }

  return (
    <main
      className="
        relative flex min-h-screen
        flex-col overflow-hidden
        bg-[#090718] text-white
      "
    >

      <div
        className="
          fixed inset-0
          bg-cover bg-center
          bg-no-repeat
        "
        style={{ backgroundImage: `url(${bgImage})` }}
      />



      <div
        className="
          fixed inset-0
          bg-linear-to-r
          from-[#090718]/95
          via-[#110925]/80
          to-[#100721]/90
        "
      />


      <div
        className="
          fixed -left-40 top-1/3
          size-125
          rounded-full
          bg-violet-600/20
          blur-[130px]
        "
      />

      <div
        className="
          fixed -right-40 bottom-0
          size-125
          rounded-full
          bg-fuchsia-600/20
          blur-[130px]
        "
      />

      <Navbar
        dark={dark}
        setDark={setDark}
        onSignUp={handleSignUp}
      />

      <div
        className="
          relative z-10
          mx-auto md:flex md:flex-row w-full
          max-w-375
          flex-1
          flex
       flex-col
          items-center
          gap-10
          px-5 py-10
        sm:flex 
          lg:px-8
          xl:px-12
        "
      >
        <HeroSection />

        <PhotoCollage />

        <LoginCard
          onForgotPassword={() =>
            setForgotPasswordOpen(true)
          }
          onCreateAccount={handleCreateAccount}
          showToast={showToast}
        />
      </div>

      <Footer
        dark={dark}
        setDark={setDark}
      />

      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onClose={() =>
          setForgotPasswordOpen(false)
        }
      />

      <Toast
        message={toast}
        onClose={() => setToast("")}
      />
    </main>
  );
});

export default LandingPage;