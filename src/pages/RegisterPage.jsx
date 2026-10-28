import { useEffect, useState } from "react";

import RegisterNavbar from "../components/register/RegisterNavbar";
import RegisterHero from "../components/register/RegisterHero";
import RegisterFormCard from "../components/register/RegisterFormCard";

import bgImage from '../assets/images/pixora_landing_bg.png'
import { useNavigate } from "react-router-dom";
import Footer from "../components/landingPageComponents/Footer";


const RegisterPage = () => {
  
  const [toast, setToast] =
    useState("");

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
  const handleLogin = () => {
    navigate('/')
  };

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-hidden
        bg-[#060419]
        text-white
      "
    >
      
      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            `url(${bgImage})`
        }}
      />



      <div
        className="
          fixed
          inset-0
          bg-linear-to-r
          from-[#05031b]/95
          via-[#090523]/70
          to-[#08051d]/90
        "
      />



      <div
        className="
          pointer-events-none
          fixed
          left-[20%]
          top-[20%]
          size-125
          rounded-full
          bg-violet-600/15
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          right-[15%]
          top-[35%]
          size-112.5
          rounded-full
          bg-fuchsia-500/10
          blur-[150px]
        "
      />



      <RegisterNavbar
        onLogin={handleLogin}
      />


      <div
        className="
          relative
          z-10
          mx-auto
          
          w-full
          max-w-[1600px]
          flex flex-col lg:flex-row
          gap-12
          px-6
          py-10
          
          lg:px-12
          xl:px-16
        "
      >
        <RegisterHero />

        <div className="flex w-full justify-center">
          <RegisterFormCard
          onLogin={handleLogin}
          showToast={showToast}
        />
        </div>
      </div>



      <Footer />



      {toast && (
        <div
          className="
            fixed
            right-5
            top-5
            z-100
            max-w-sm
            rounded-xl
            border
            border-white/10
            bg-[#15112a]/95
            px-5
            py-4
            text-sm
            text-white
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {toast}
        </div>
      )}
    </main>
  );
};

export default RegisterPage;