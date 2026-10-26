import {
  Camera,
  Sparkles,
  Users,
} from "lucide-react";

import FeatureItem from "./FeatureItem.jsx";


const HeroSection = () => {
  
  return (
    <section className="relative z-20">

      <div className="max-w-xl">
        <p
          className="
            mb-5 inline-flex items-center gap-2
            rounded-full
            border border-violet-400/20
            bg-violet-500/10
            px-4 py-2
            text-xs font-medium
            text-violet-200
            backdrop-blur-md
          "
        >
          <Sparkles size={14} />
          A new way to share your world
        </p>

        <h1
          className="
            text-5xl font-extrabold
            leading-[0.95]
            tracking-[-0.04em]
            sm:text-6xl
            lg:text-7xl
            xl:text-8xl
          "
        >
          <span className="text-white">
            Capture.
          </span>

          <br />

          <span className="text-white">
            Share.
          </span>

          <br />

          <span
            className="
              bg-linear-to-r
              from-violet-400
              via-fuchsia-400
              to-purple-300
              bg-clip-text
              text-transparent
            "
          >
            Inspire.
          </span>
        </h1>

        <p
          className="
            mt-7 max-w-md
            text-base leading-7
            text-white/65
            sm:text-lg
          "
        >
          Pixora is the home for your photos
          and the stories behind them.
        </p>

        <div className="mt-9 space-y-5">
          <FeatureItem
            icon={Camera}
            title="Capture Moments"
            description="Share your best shots"
          />

          <FeatureItem
            icon={Users}
            title="Connect & Share"
            description="Build real connections"
          />

          <FeatureItem
            icon={Sparkles}
            title="Discover & Inspire"
            description="Explore amazing content"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;