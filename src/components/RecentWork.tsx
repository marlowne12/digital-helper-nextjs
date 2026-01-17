import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const RecentWork: React.FC = () => {
    return (
        <section id="work" className="py-20 border-y border-slate-900 bg-black">
            <div className="container mx-auto px-6 mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Recent Transformations</h2>
                    <p className="text-slate-500">See how we modernized these local businesses.</p>
                </div>
                <Link
                    href="/case-studies"
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors flex items-center gap-1"
                >
                    View All Case Studies <ArrowRight size={16} />
                </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-video bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative group snap-center cursor-pointer">
                        {/* Using placeholder image services that are reliable */}
                        <img
                            src={`https://picsum.photos/800/600?random=${i}`}
                            alt={`Website transformation project ${i}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-bold text-xl">Project Alpha {i}</h3>
                            <p className="text-cyan-400 text-sm">Old Site → Modern Web App</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
