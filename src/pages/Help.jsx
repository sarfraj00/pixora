
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  ChevronDown,
  UserRound,
  Image,
  ShieldCheck,
  Mail,
  Search,
} from "lucide-react";

const faqs = [
  {
    question: "How do I create a Pixora account?",
    answer:
      "Click Get Started, enter your registration details, and complete any email verification required by Pixora.",
  },
  {
    question: "How can I upload a photo?",
    answer:
      "Sign in to your account and use the create-post feature to select and upload a photo. Add any supported caption or details before publishing.",
  },
  {
    question: "How do I change my profile?",
    answer:
      "Open your profile and select Edit Profile to update the profile information and images supported by your account.",
  },
  {
    question: "Can I make my account private?",
    answer:
      "If private-account functionality is enabled, open Settings and change your account privacy preference. Check the confirmation shown by Pixora to understand its effects.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page, select Forgot Password, and follow the instructions sent to your registered email address.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Open Settings and look for the Delete Account option, if available. Review the confirmation carefully before proceeding.",
  },
];

const categories = [
  {
    icon: UserRound,
    title: "Account & Profile",
    description: "Registration, login, profile updates, and passwords.",
  },
  {
    icon: Image,
    title: "Photos & Posts",
    description: "Uploading, managing, saving, and removing posts.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description: "Account privacy and protecting your information.",
  },
];

export default function Help() {

   useEffect(()=>{
      window.scrollTo({top:'0px',behavior:'smooth'})
    })

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-linear-to-br from-violet-700 via-violet-600 to-pink-500 px-5 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
            <HelpCircle size={30} />
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            How can we help?
          </h1>

          <p className="mt-4 text-base leading-7 text-violet-100">
            Find answers and get help using Pixora.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-xl">
            <Search className="shrink-0 text-gray-400" size={21} />

            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIndex(-1);
              }}
              placeholder="Search questions..."
              aria-label="Search help questions"
              className="w-full border-0 bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Icon size={23} />
              </div>
              <h2 className="font-bold text-gray-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-black text-gray-900">
            Frequently asked questions
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Quick answers to common questions.
          </p>

          <div className="mt-6 space-y-3">
            {filteredFaqs.map((faq) => {
              const index = faqs.indexOf(faq);
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-gray-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-violet-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredFaqs.length === 0 && (
              <p className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                No matching questions found. Try another search.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-violet-50 p-7 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
            <Mail size={24} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Still need help?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-600">
            Can't find your answer? Reach out to the Pixora support team
            through your configured support channel.
          </p>

          <Link
            to="/privacy-policy"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Visit Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}
