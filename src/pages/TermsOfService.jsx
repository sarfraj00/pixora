
import { FileText } from "lucide-react";
import { useEffect } from "react";

const terms = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing or using Pixora, you agree to these Terms of Service. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. User Accounts",
    text: "Provide accurate account information, keep your login credentials secure, and do not impersonate others or use another person's account without authorization.",
  },
  {
    title: "3. Content and Ownership",
    text: "You retain ownership of the content you create and upload, subject to any rights belonging to others. By posting content, you grant Pixora the limited permissions needed to host, store, display, and distribute that content as required to provide the service.",
  },
  {
    title: "4. Acceptable Use",
    text: "Do not upload unlawful, abusive, threatening, fraudulent, or infringing content. Do not harass other users, attempt unauthorized access, distribute malware, or interfere with platform operations.",
  },
  {
    title: "5. Privacy",
    text: "Your use of Pixora is also subject to our Privacy Policy. Review the policy to understand how information is handled.",
  },
  {
    title: "6. Account Suspension and Deletion",
    text: "Pixora may restrict or suspend accounts for violations of these terms, subject to applicable law. You may request account deletion through available account settings or support. Explain the actual deletion and data-retention process before publishing these terms.",
  },
  {
    title: "7. Service Availability",
    text: "We aim to keep Pixora available and secure, but we cannot guarantee uninterrupted access. Features may change, be temporarily unavailable, or be discontinued.",
  },
  {
    title: "8. Limitation of Liability",
    text: "To the extent permitted by applicable law, the terms governing liability for service interruptions, data loss, and other damages will be determined by the applicable law and any valid limitations stated here.",
  },
  {
    title: "9. Changes to These Terms",
    text: "We may update these terms when necessary. Material changes should be communicated through an appropriate channel, with an updated effective date.",
  },
{
  title: "10. Contact",
  text: "For any enquiries, privacy questions, or requests, please contact us at pixxxora@gmail.com.",
},
];

export default function TermsOfService() {
 useEffect(()=>{
    window.scrollTo({top:'0px',behavior:'smooth'})
  })

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-14 sm:py-20">
      <article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10 lg:p-14">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <FileText size={30} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
          Using Pixora responsibly
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
          Terms of Service
        </h1>

    
        <p className="mt-6 leading-8 text-gray-600">
          These terms govern your access to and use of Pixora, including
          creating an account, uploading photographs, interacting with other
          users, and using platform features.
        </p>

        
<div className="mt-10 space-y-9">
  {terms.map((section) => (
    <section key={section.title}>
      <h2 className="text-lg font-bold text-gray-900">
        {section.title}
      </h2>

      {section.title === "10. Contact" ? (
        <p className="mt-3 text-sm leading-8 text-gray-600 sm:text-base">
          For any enquiries, privacy questions, or requests, please
          contact us at{" "}
          <a
            href="mailto:support@pixxora.com"
            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
          >
            pixxxora@gmail.com
          </a>.
        </p>
      ) : (
        <p className="mt-3 text-sm leading-8 text-gray-600 sm:text-base">
          {section.text}
        </p>
      )}
    </section>
  ))}
</div>


    
      </article>
    </main>
  );
}
