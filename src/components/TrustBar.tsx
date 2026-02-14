import { Shield, Star, Clock, TrendingUp, Award, Users } from 'lucide-react';

const metrics = [
  {
    icon: Users,
    value: '50+',
    label: 'Local Businesses Served',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Average Client Rating',
  },
  {
    icon: TrendingUp,
    value: '145%',
    label: 'Avg. Traffic Increase',
  },
  {
    icon: Clock,
    value: '< 2s',
    label: 'Page Load Times',
  },
  {
    icon: Award,
    value: '100%',
    label: 'Client Retention',
  },
  {
    icon: Shield,
    value: '24/7',
    label: 'Support & Monitoring',
  },
];

const industries = [
  'Plumbing & HVAC',
  'Dental & Medical',
  'Restaurants & Cafes',
  'Real Estate',
  'Legal Services',
  'Auto Repair',
  'Retail & E-Commerce',
  'Construction',
];

export function TrustBar() {
  return (
    <section className="relative py-16 bg-slate-900/50 border-y border-white/5" aria-label="Trust indicators and client metrics">
      <div className="container mx-auto px-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:border-cyan-500/20 transition-colors"
            >
              <metric.icon className="h-5 w-5 text-cyan-400 mx-auto mb-2" aria-hidden="true" />
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Industries Served */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider font-medium">
            Trusted by Tri-Cities businesses in
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-1.5 text-sm text-slate-300 bg-slate-800/50 rounded-full border border-white/5"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial Highlight */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <blockquote className="relative">
            <p className="text-lg text-slate-300 italic leading-relaxed">
              &ldquo;Digital Helper transformed our outdated website into a modern lead machine. We saw a 200% increase in online inquiries within the first month.&rdquo;
            </p>
            <footer className="mt-4">
              <p className="text-sm font-semibold text-white">Mike Richardson</p>
              <p className="text-xs text-slate-500">Owner, Columbia Basin Plumbing &mdash; Richland, WA</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
