import {
  Camera,
  Sparkles,
  Users,
} from "lucide-react";

import RegisterFeature from "./RegisterFeature";

const RegisterHero = () => {

  return (
    <section
      className="
        relative
        z-20
        max-w-xl
        lg:pb-10
      "
    >
      <h1
        className="
          text-5xl
          font-extrabold
          leading-[1.02]
          tracking-[-0.04em]
          text-white
          sm:text-6xl
          lg:text-7xl
        "
      >
        Join Pixora.
      </h1>

      <h2
        className="
          mt-2
          text-4xl
          font-extrabold
          leading-tight
          tracking-[-0.035em]
          bg-linear-to-r
          from-violet-400
          via-fuchsia-400
          to-pink-400
          bg-clip-text
          text-transparent
          sm:text-5xl
          lg:text-6xl
        "
      >
        Share your world.
      </h2>

      <p
        className="
          mt-7
          max-w-lg
          text-base
          leading-7
          text-white/75
          sm:text-lg
        "
      >
        Create your account and start
        capturing, sharing and discovering
        amazing moments.
      </p>

      <div
        className="
          mt-10
          space-y-6
        "
      >
        <RegisterFeature
          icon={Camera}
          title="Capture"
          description="Save your best moments"
        />

        <RegisterFeature
          icon={Users}
          title="Connect"
          description="Build real connections"
        />

        <RegisterFeature
          icon={Sparkles}
          title="Inspire"
          description="Discover amazing content"
        />
      </div>
    </section>
  );
};

export default RegisterHero;