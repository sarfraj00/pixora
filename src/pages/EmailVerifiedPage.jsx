import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PixoraLogo from "../components/emailVerification/PixoraLogo";
import VerificationSuccessCard from "../components/emailVerification/VerificationSuccessCard";
import SecurityMessage from "../components/emailVerification/SecurityMessage";
import VerificationFooter from "../components/emailVerification/VerificationFooter.jsx";
import { memo } from "react";


const EmailVerifiedPage = memo(() => {

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#05031a]
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


      <header
        className="
          relative
          z-30
          mx-auto
          flex
          h-24
          max-w-[1600px]
          items-center
          justify-between
          px-6
          lg:px-12
          xl:px-16
        "
      >
        <PixoraLogo />

        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            group
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-white/70
            transition
            hover:text-white
          "
        >
          <ArrowLeft
            size={18}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          />

          Back to Login
        </button>
      </header>


      <section
        className="
          relative
          z-20
          flex
          min-h-[calc(100vh-96px)]
          flex-col
          items-center
          justify-center
          px-5
          pb-10
          pt-8
          
        "
      >

        <VerificationSuccessCard
          onContinue={handleContinue}
          onDashboard={handleDashboard}
        />


        <SecurityMessage />
      </section>


      <VerificationFooter />
    </main>
  );
});

export default EmailVerifiedPage;