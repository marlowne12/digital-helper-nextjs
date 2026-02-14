import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Digital Helper',
    description: 'Privacy Policy for Digital Helper - Web design, SEO, and AI automation agency in Richland, WA.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary">
            <article className="container mx-auto px-6 max-w-3xl">

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Privacy Policy
                </h1>

                <p className="text-zinc-500 mb-12">
                    Last updated: January 19, 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Digital Helper (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website digital-helper.com and use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            We collect information you provide directly to us, such as:
                        </p>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Name, email address, and phone number when you contact us</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Business information when you use our audit tools</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Website URLs for analysis purposes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Payment information when purchasing services</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Automatically Collected Information</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We refer to this automatically-collected information as &quot;Device Information.&quot;
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Your Information</h2>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Provide, operate, and maintain our services</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Process and complete transactions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Communicate with you about updates and offers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Improve our website and services</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Comply with legal obligations</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We may use third-party services that collect, monitor, and analyze information. These include Google Analytics for website analytics, Cal.com for appointment scheduling, and Slack for internal notifications. Each of these services has their own privacy policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@digital-helper.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="glass p-6 rounded-xl mt-4">
                            <p className="text-white font-semibold">Digital Helper</p>
                            <p className="text-zinc-400">Richland, WA</p>
                            <p className="text-zinc-400">hello@digital-helper.com</p>
                        </div>
                    </section>

                </div>

            </article>
        </main>
    );
}
