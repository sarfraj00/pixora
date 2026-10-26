
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  UserRoundX,
} from "lucide-react";

const UserNotFound = ({ username }) => {
  const navigate = useNavigate();

  return (

    <div className="flex justify-center items-center w-full h-screen text-neutral-200" >

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

      <div className="flex flex-col items-center sm:border sm:border-[#371356] rounded-2xl absolute backdrop-blur-2xl p-3 bg-black/4 w-full sm:w-fit">
        <button
          onClick={() => navigate("/home")}
          className="
                group relative mx-auto mb-10
                flex items-center justify-center
              "
        >
          <div
            className="
                  absolute
                  h-12 w-32
                  rounded-full
                  bg-primary/20
                  blur-xl
                  opacity-60
                  transition-all duration-500
                  group-hover:opacity-100
                  group-hover:scale-110
                "
          />

          <div
            className="
                  relative
                  text-4xl font-black tracking-tight
                  transition-transform duration-500 italic
                  group-hover:scale-105
                "
          >
            Pixora
          </div>
        </button>


        <div className="relative mx-auto mb-7 w-fit">

          <div
            className="
                  absolute -inset-3
                  rounded-full
                  border border-primary/20
                  border-dashed
                  animate-[spin_12s_linear_infinite]
                "
          />

          <div
            className="
                  absolute inset-0
                  rounded-full
                  bg-primary/20
                  blur-2xl
                  animate-pulse
                "
          />

          <div
            className="
                  relative
                  flex h-28 w-28
                  items-center justify-center
                  rounded-full
                  border border-base-content/10
                  bg-base-200
                  shadow-inner
                  transition-all duration-500
                  hover:scale-110
                  hover:rotate-6
                "
          >
            <UserRoundX
              size={48}
              strokeWidth={1.4}
              className="text-base-content/50"
            />
          </div>

          <span
            className="
                  absolute bottom-1 right-1
                  h-5 w-5
                  rounded-full
                  border-4 border-base-100
                  bg-base-content/20
                "
          />
        </div>
        <div className="flex justify-center  flex-col items-center">
          <p
            className="
                text-xs font-bold
                uppercase tracking-[0.4em]
                text-primary
              "
          >
            404 • Profile Lost
          </p>


          <h1
            className="
                mt-3
                text-3xl font-black tracking-tight
                sm:text-4xl
              "
          >
            User not found
          </h1>

        </div>

        {username && (
          <div
            className="
                  mx-auto mt-4
                  w-fit
                  rounded-full
                  border border-base-content/10
                  bg-base-200/70
                  px-4 py-2
                  text-sm font-semibold
                  text-base-content/70
                "
          >
            @{username}
          </div>
        )}


        <p
          className="
       text-center
                mx-auto mt-5
                max-w-md
                text-sm leading-6
                text-base-content/55
                sm:text-base
              "
        >
          Looks like this profile wandered outside
          the Pixora universe. It may have been deleted,
          renamed, or never existed.
        </p>


        <div
          className="
                mt-8
                flex gap-8
                sm:flex-row sm:justify-center
              "
        >

          <button
            onClick={() => navigate(-1)}
            className="
                  btn btn-outline
                  rounded-xl
                  gap-2
                  transition-all duration-300
                  hover:-translate-y-1
                "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>


          <button
            onClick={() => navigate("/home")}
            className="
                 
                  rounded-xl
                  gap-2
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-primary/30
                 
                "
          >
            <Home size={18} />
            Go Home
          </button>

        </div>


        <p
          className="
                mt-7
                text-[10px]
                font-medium
                uppercase
                tracking-[0.3em]
                flex justify-center
                text-base-content/25
              "
        >
          Share • Discover • Pixora
        </p>
      </div>
    </div>

  );
};

export default UserNotFound;

