import React from 'react';


interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  type?: 'success' | 'warning' | 'info';
}

export function InsightCard({ icon, title, description, type = 'info' }: InsightCardProps) {
  const typeColors = {
    success: 'bg-green-500/10 border-green-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    info: 'bg-accent-primary/10 border-accent-primary/20'
  };

  return (
    <div className={`glass p-6 rounded-2xl border ${typeColors[type]}`}>
      <div className="flex items-start gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-zinc-300 leading-relaxed">{description}</p>
    </div>
  );
}
