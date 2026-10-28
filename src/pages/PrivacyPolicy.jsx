
import { ShieldCheck } from "lucide-react";

const sections = [
    {
        title: "1. Information We Collect",
        text: "Pixora may collect account information such as your name, username, email address, profile photo, bio, and the photos or other content you choose to upload. Technical information such as device details and log data may also be processed to operate and protect the platform.",
    },
    {
        title: "2. How We Use Your Information",
        text: "Information may be used to create and manage your account, display your profile and posts, support following and commenting features, improve the platform, respond to support requests, and detect abuse or unauthorized access.",
    },
    {
        title: "3. Photos and Profile Visibility",
        text: "Your posts and profile information may be visible to other users according to your account privacy settings and the features you use. Before publishing, consider whether you want others to view, save, or share your content.",
    },
    {
        title: "4. Cookies and Authentication",
        text: "Pixora may use cookies or similar technologies to support authentication, maintain sessions, and protect account security. You can manage cookies through your browser, although disabling some cookies may affect functionality.",
    },
    {
        title: "5. Data Storage and Security",
        text: "We use appropriate technical and organizational measures to protect information. However, no online service can guarantee absolute security. Information may be processed by hosting, database, or media-storage providers used to operate Pixora.",
    },
    {
        title: "6. Sharing of Information",
        text: "Information may be shared with service providers when necessary to operate the platform, or disclosed when legally required. Pixora should not share personal information for unrelated purposes without an appropriate legal basis.",
    },
    {
        title: "7. Your Choices and Rights",
        text: "You may be able to update your profile, adjust privacy settings, remove posts, or request account deletion. Additional rights and procedures depend on applicable law. Some information may need to be retained where legally required.",
    },
    {
        title: "8. Contact",
        text: "For privacy questions or requests, contact the Pixora team through the official support channel published on the platform.",
    },
];

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gray-50 px-5 py-14 sm:py-20">
            <article className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10 lg:p-14">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <ShieldCheck size={30} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                    Your privacy matters
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
                    Privacy Policy
                </h1>



                <p className="mt-6 leading-8 text-gray-600">
                    This policy describes how Pixora collects, uses, stores, and
                    protects information when you use our photo-sharing platform.
                </p>


                <div className="mt-10 space-y-9">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-lg font-bold text-gray-900">
                                {section.title}
                            </h2>

                            {section.title === "8. Contact" ? (
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
