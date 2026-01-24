import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

interface Phase {
  phase: string;
  period: string;
  tasks: string[];
}

interface ImplementationTimelineProps {
  phases: Phase[];
}

export function ImplementationTimeline({ phases }: ImplementationTimelineProps) {
  return (
    <div className="glass p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-accent-primary" />
        Keyword Implementation Strategy
      </h2>

      <div className="space-y-6">
        {phases.map((phase, idx) => (
          <div key={idx} className="border-l-2 border-accent-primary/20 pl-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.phase}</h3>
                <p className="text-zinc-400 text-sm">{phase.period}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {phase.tasks.map((task, taskIdx) => (
                <li key={taskIdx} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
