import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info - Service Area Business */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Digital Helper Agency</h3>
                        <div className="space-y-2">
                            <p className="text-slate-400">Serving Tri-Cities Area</p>
                            <p>Richland, WA 99352</p>
                            <p className="mt-3">
                                <a href="tel:+15095550123" className="hover:text-cyan-400 transition-colors">
                                    (509) 555-0123
                                </a>
                            </p>
                            <p>
                                <a href="mailto:hello@digitalhelper.com" className="hover:text-cyan-400 transition-colors">
                                    hello@digitalhelper.com
                                </a>
                            </p>
                            <p className="mt-3">
                                <a
                                    href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                >
                                    View Service Area →
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="/seo" className="hover:text-cyan-400 transition-colors">Local SEO</Link></li>
                            <li><Link href="/web-design" className="hover:text-cyan-400 transition-colors">Web Design</Link></li>
                            <li><Link href="/ai-agency" className="hover:text-cyan-400 transition-colors">AI Integration</Link></li>
                            <li><Link href="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</Link></li>
                            <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Areas Served */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Areas Served</h4>
                        <ul className="space-y-1">
                            <li>Richland, WA</li>
                            <li>Kennewick, WA</li>
                            <li>Pasco, WA</li>
                            <li>West Richland, WA</li>
                            <li>Benton City, WA</li>
                            <li>All Tri-Cities Area</li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Business Hours</h4>
                        <ul className="space-y-1">
                            <li>Monday - Friday</li>
                            <li>9:00 AM - 5:00 PM PST</li>
                            <li className="pt-2">
                                <a
                                    href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                                >
                                    View on Google Maps →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="text-center border-t border-slate-900 pt-8">
                    <p>&copy; {new Date().getFullYear()} Digital Helper Agency. All rights reserved.</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <a href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Business Profile</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
