import React, { useState } from 'react';
import type { ArchitectureComponentDetail } from '../types';
import { GeminiActions } from './GeminiActions';
import { Spinner } from './Spinner';

interface ArchitectureCardProps {
  title: string;
  data: ArchitectureComponentDetail;
  icon: React.ReactNode;
}

/**
 * A component that displays a section of details.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the section.
 * @param {string | undefined} props.content - The content of the section.
 * @returns {JSX.Element | null} The rendered detail section, or null if there is no content.
 */
const DetailSection: React.FC<{ title: string; content: string | undefined }> = ({ title, content }) => {
  if (!content) return null;

  const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-200">$1</strong>');

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-sm mb-2">{title}</h4>
      <div 
        className="text-slate-400 text-base leading-relaxed space-y-2" 
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  );
};

/**
 * A component that displays a card with information about a software architecture component.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {ArchitectureComponentDetail} props.data - The data for the component.
 * @param {React.ReactNode} props.icon - The icon for the card.
 * @returns {JSX.Element} The rendered architecture card.
 */
export const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ title, data, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const detailFields: { key: keyof ArchitectureComponentDetail | 'verwaltung_generierung', title: string }[] = [
      { key: 'inhalt', title: 'Inhalt' },
      { key: 'aufbau', title: 'Aufbau' },
      { key: 'zweck', title: 'Zweck' },
      { key: 'zugriff', title: 'Zugriff' },
      { key: 'verwaltung', title: 'Verwaltung' },
      { key: 'generierung', title: 'Generierung' },
      { key: 'verwaltung_generierung', title: 'Verwaltung & Generierung' },
      { key: 'architekturmuster', title: 'Architekturmuster' },
      { key: 'infrastruktur', title: 'Infrastruktur' },
  ];

  const handleResult = (result: string | null) => {
    setAnalysisResult(result);
    setIsLoading(false);
    if (result) {
        setIsExpanded(true);
    }
  };

  const handleLoading = (loading: boolean) => {
      setIsLoading(loading);
      if (loading) {
          setAnalysisResult(null);
      }
  }

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden my-4 transition-all duration-300 hover:shadow-cyan-500/10 hover:border-slate-600">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        aria-expanded={isExpanded}
        aria-controls={`card-content-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-5 bg-slate-900/50 p-3 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-100">{title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 text-slate-400 transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`card-content-${title.replace(/\s+/g, '-')}`}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-slate-700/50">
          {detailFields.map(field => (
             <DetailSection
                key={field.key}
                title={field.title}
                content={data[field.key as keyof ArchitectureComponentDetail]}
            />
          ))}
          <GeminiActions content={JSON.stringify(data)} title={title} onResult={handleResult} onLoading={handleLoading} />
           {(isLoading || analysisResult) && (
            <div className="mt-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              {isLoading && <div className="flex items-center justify-center p-8"><Spinner className="h-8 w-8" /></div>}
              {analysisResult && (
                 <div
                    className="text-slate-300 text-base leading-relaxed space-y-2"
                    dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>').replace(/\n/g, '<br />') }}
                />
              )}
            </div>
           )}
        </div>
      </div>
    </div>
  );
};