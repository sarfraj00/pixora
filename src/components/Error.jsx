import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { memo } from "react";

const ErrorPage = memo(({
  error,

}) => {

  const handleRetry = () => {
    window.location.reload();
  };



  return (
    <main
      className="
        relative
        flex
        min-h-full
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
            rounded-[30px]
            border
            border-violet-900
            bg-[#0c0925]/20
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
                border-amber-400/30
                bg-amber-400/5
                shadow-[0_0_45px_rgba(251,191,36,0.1)]
              "
            >
              <AlertTriangle
                size={46}
                strokeWidth={1.8}
                className="text-amber-400"
              />

              <div
                className="
                  absolute
                  -right-1
                  -top-1
                  grid
                  size-7
                  place-items-center
                  rounded-full
                  border-2
                  border-[#0c0925]
                  bg-amber-500
                "
              >
                <TriangleAlert
                  size={14}
                  className="text-white"
                />
              </div>
            </div>
          </div>

      

          <div className="mt-9 text-center">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-amber-400/80
              "
            >
              Unexpected Error
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              Something went wrong
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-base
                leading-7
                text-white/55
              "
            >
              Something unexpected happened
              while loading this page. Please
              try again.
            </p>
          </div>

        

          {error?.message && (
            <div
              className="
                mt-7
                rounded-xl
                border
                border-white/10
                bg-black/10
                px-4
                py-3
              "
            >
              <p
                className="
                  wrap-break-word
                  text-center
                  text-xl
                  text-orange-300
                "
              >
                {error.message}
              </p>
            </div>
          )}

        

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
          >
          
            <button
              type="button"
              onClick={handleRetry}
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
                active:translate-y-0
              "
            >
              <RefreshCw
                size={19}
                className="
                  transition-transform
                  duration-500
                  group-hover:rotate-180
                "
              />

              Try Again
            </button>

          

            <button
              type="button"
              onClick={() => window.location.href = '/'}
            className="
            flex
            h-14
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/15
            bg-white/2
            font-medium
            text-white/70
            transition-all
            duration-300
            hover:border-violet-400/30
            hover:bg-violet-500/5
            hover:text-white
            "
            >
            <Home size={19} />

            Go Home
          </button>
        </div>

    

        <button
          type="button"
          onClick={() =>
            window.history.back()
          }
          className="
              mx-auto
              mt-6
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

          Go back
        </button>
      </div>
    </div>
    </main >
  );
});

export default ErrorPage;