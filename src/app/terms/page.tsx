import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Digital Helper',
    description: 'Terms of Service for Digital Helper - Web design, SEO, and AI automation agency in Richland, WA.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary">
            <article className="container mx-auto px-6 max-w-3xl">

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Terms of Service
                </h1>

                <p className="text-zinc-500 mb-12">
                    Last updated: January 19, 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            By accessing or using the Digital Helper website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Digital Helper provides web design, SEO, AI automation, and lead generation services. The scope of services will be defined in individual service agreements or proposals provided to clients.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            Upon full payment, clients receive ownership of custom work created specifically for them. However:
                        </p>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>We retain rights to use work in our portfolio</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Pre-existing frameworks and tools remain our property</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Third-party assets are subject to their respective licenses</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Payment terms are specified in individual service agreements. Generally, projects require a deposit before work begins, with the balance due upon completion. Monthly retainer services are billed in advance. Late payments may result in service suspension.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Pay-Per-Lead Services</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            For pay-per-lead services, &quot;qualified leads&quot; are defined in your service agreement. You agree to pay for all leads meeting the agreed-upon criteria. Lead pricing is subject to change with 30 days notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Client Responsibilities</h2>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            Clients are responsible for:
                        </p>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Providing accurate and complete information</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Timely feedback and approvals</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Maintaining backup copies of provided materials</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                                <span>Ensuring they have rights to provided content</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Digital Helper shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Either party may terminate services with 30 days written notice. Upon termination, you will receive all completed work and assets. Any outstanding balances become immediately due.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            These terms shall be governed by the laws of the State of Washington, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We reserve the right to modify these terms at any time. We will notify active clients of significant changes. Continued use of our services constitutes acceptance of updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Contact</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            For questions about these Terms of Service, contact us:
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
