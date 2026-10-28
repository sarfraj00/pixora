
import { Camera, Heart, Compass, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Camera,
    title: "Share your moments",
    description:
      "Publish photos that capture your experiences, creativity, and everyday life.",
  },
  {
    icon: Compass,
    title: "Discover inspiration",
    description:
      "Explore photographs and discover new perspectives from other creators.",
  },
  {
    icon: Users,
    title: "Build connections",
    description:
      "Follow people whose work you enjoy and engage with their posts.",
  },
];

export default function About() {

  useEffect(()=>{
    window.scrollTo({top:'0px',behavior:'smooth'})
  })

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-linear-to-br from-violet-50 via-white to-pink-50 px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <Heart size={16} /> Our story
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
            Every picture has a{" "}
            <span className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              story.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Pixora is a photo-sharing platform built to help people express
            themselves visually, discover creativity, and connect through
            meaningful moments.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            Join Pixora
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What makes Pixora special?
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            A simple space for visual expression and community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
