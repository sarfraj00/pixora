import {
  Compass,
  Home,
  Search,
} from "lucide-react";
import { memo } from "react";


const NotFound = memo(({ }) => {

  const handleGoToHome = () => {
    window.location.href = '/home';
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
          max-w-175
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
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-[#0c0925]/20
            p-8
            shadow-2xl
            shadow-black/50
            backdrop-blur-2xl
            sm:p-12
          "
        >


          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              size-64
              -translate-x-1/2
              rounded-full
              bg-violet-600/10
              blur-[90px]
            "
          />

          <div className="relative z-10">


            <div
              className="
                relative
                mx-auto
                flex
                size-32
                items-center
                justify-center
              "
            >


              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-violet-400/20
                "
              />


              <div
                className="
                  absolute
                  inset-3
                  rounded-full
                  border
                  border-fuchsia-400/10
                "
              />


              <div
                className="
                  relative
                  grid
                  size-20
                  place-items-center
                  rounded-2xl
                  border
                  border-violet-400/20
                  bg-violet-500/10
                  shadow-[0_0_45px_rgba(139,92,246,0.15)]
                "
              >
                <Compass
                  size={42}
                  strokeWidth={1.7}
                  className="
                    text-violet-300
                    transition-transform
                    duration-700
                    hover:rotate-45
                  "
                />
              </div>
            </div>



            <div
              className="
                mt-8
                text-center
              "
            >
              <h1
                className="
                  bg-linear-to-r
                  from-violet-400
                  via-fuchsia-400
                  to-pink-400
                  bg-clip-text
                  text-[90px]
                  font-black
                  leading-none
                  tracking-[-0.06em]
                  text-transparent
                  sm:text-[120px]
                "
              >
                404
              </h1>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Page not found
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-md
                  text-base
                  leading-7
                  text-white/55
                  sm:text-lg
                "
              >
                Looks like you've wandered
                somewhere that doesn't exist.
                The page you're looking for
                may have been moved or
                doesn't exist anymore.
              </p>
            </div>


            <div
              className="
                mx-auto
                mt-8
                flex
                max-w-md
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/2
                px-4
                py-3
              "
            >
              <Search
                size={19}
                className="shrink-0 text-white/30"
              />

              <span
                className="
                  truncate
                  text-sm
                  text-white/35
                "
              >
                This page doesn't exist...
              </span>
            </div>



            <div
              className="
                mt-7
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-1
              "
            >


              <button
                type="button"
                onClick={handleGoToHome}
                className="
                  group
                  flex
                  h-14
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
                  active:translate-y-0
                "
              >
                <Home
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                Go to Home
              </button>

            </div>


            <p
              className="
                mt-7
                text-center
                text-xs
                text-white/30
              "
            >
              If you think this is a mistake,
              please try refreshing the page.
            </p>
          </div>
        </div>


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
});

export default NotFound;