import { Metadata } from 'next';
import { Clock, Video, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Book a Free Consultation | Digital Helper',
    description: 'Schedule a free 15-minute strategy call with Digital Helper to discuss your web design, SEO, and automation goals.',
};

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-24">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Let&apos;s Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital System</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            Schedule a free 15-minute strategy call to discuss your project. No hype, no jargon—just a clear plan for your business growth.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Info Panel */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-md">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Clock size={20} className="text-cyan-400" /> What to expect
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Current system audit",
                                        "Goal alignment check",
                                        "Custom automation ideas",
                                        "Pricing & timeline chat"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-slate-400 text-sm">
                                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-md">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Video size={20} className="text-purple-400" /> Call Details
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Duration</span>
                                        <span className="text-white font-medium">15 Minutes</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Location</span>
                                        <span className="text-white font-medium">Google Meet / Zoom</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Cost</span>
                                        <span className="text-green-400 font-bold">$0 (Free)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Booking Widget */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 min-h-[600px] relative">
                                {/* Embed Placeholder */}
                                <div className="absolute inset-0 bg-white">
                                    <iframe
                                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2x7p4zRU8_Y6kRU8_jFDgyirZ2xZZ6kRU8?gv=true"
                                        style={{ border: 0 }}
                                        width="100%"
                                        height="700"
                                        frameBorder="0"
                                        className="w-full h-full min-h-[700px] rounded-2xl"
                                    ></iframe>
                                </div>
                            </div>
                            <p className="text-center text-slate-500 text-xs mt-6">
                                Not a fan of video calls? <Link href="/#contact" className="underline hover:text-white">Email us instead.</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
