import { LoaderCircle } from "lucide-react";
const PixoraLoader = () => {
  return (

    <main
      className="
                fixed inset-0 z-250 flex min-h-screen items-center justify-cente
                bg-[#090718] text-white
              " >
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

      <div className="flex flex-col items-center w-full justify-center">

        <div className="relative">

          <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />
          <span className="text-4xl font-black text-primary-content italic bg-linear-to-l from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Pixora
          </span>

        </div>


   
        <div className="mt-3 flex items-center gap-2 text-base-content/50">
          <LoaderCircle
            size={20}
            className="animate-spin"
          />
        </div>

      </div>
    </main>
  );
};

export default PixoraLoader;