
import React from 'react';
import { DEVELOPMENT_BLUEPRINT_DATA } from '../developmentBlueprintData';
import type { BlueprintPhase } from '../types';

/**
 * A component that displays a card for a phase in the development blueprint.
 * @param {object} props - The component props.
 * @param {BlueprintPhase} props.phase - The phase data.
 * @param {number} props.index - The index of the phase.
 * @returns {JSX.Element} The rendered phase card.
 */
const PhaseCard: React.FC<{ phase: BlueprintPhase, index: number }> = ({ phase, index }) => (
  <div className="relative pl-8 sm:pl-12 py-6 group">
    {/* Timeline line */}
    <div className="absolute left-2 sm:left-3 top-0 h-full w-px bg-slate-700 group-last:hidden"></div>
    
    {/* Timeline circle */}
    <div className="absolute left-0 top-8 z-10 w-5 h-5 sm:w-7 sm:h-7 bg-slate-800 border-2 border-slate-600 group-hover:border-cyan-400 rounded-full transition-colors"></div>
    
    <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-100">{phase.title}</h3>
        <p className="text-sm font-medium text-cyan-400 mb-2">{phase.duration}</p>
        <p className="text-slate-400 mb-4">{phase.description}</p>
        <ul className="space-y-2">
            {phase.tasks.map((task, taskIndex) => (
            <li key={taskIndex} className="flex items-start">
                <svg className="flex-shrink-0 h-5 w-5 text-emerald-400 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-slate-300">{task}</span>
            </li>
            ))}
        </ul>
    </div>
  </div>
);

/**
 * A component that displays the development blueprint.
 * @returns {JSX.Element} The rendered development blueprint component.
 */
export const DevelopmentBlueprint: React.FC = () => {
  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Development Blueprint</h2>
      <p className="text-slate-400 mb-8">A high-level overview of the phased development plan.</p>
      <div className="relative">
        {DEVELOPMENT_BLUEPRINT_DATA.map((phase, index) => (
          <PhaseCard key={index} phase={phase} index={index} />
        ))}
      </div>
    </div>
  );
};
