import React, { useState, useCallback } from 'react';
import { getAiClient } from '../gemini';
import { Modality } from '@google/genai';
import { decode, decodeAudioData } from '../utils';
import { Spinner } from './Spinner';

interface GeminiActionsProps {
  content: string;
  title: string;
  onResult: (result: string | null) => void;
  onLoading: (loading: boolean) => void;
}

type ActionType = 'summarize' | 'analyze' | 'speak';

/**
 * A component that provides a set of actions that can be performed by Gemini.
 * @param {object} props - The component props.
 * @param {string} props.content - The content to be used in the Gemini actions.
 * @param {string} props.title - The title of the content.
 * @param {function} props.onResult - A callback function to handle the result of the action.
 * @param {function} props.onLoading - A callback function to handle the loading state.
 * @returns {JSX.Element} The rendered Gemini actions component.
 */
export const GeminiActions: React.FC<GeminiActionsProps> = ({ content, title, onResult, onLoading }) => {
  const [loadingAction, setLoadingAction] = useState<ActionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = useCallback(async (action: ActionType) => {
    setLoadingAction(action);
    setError(null);
    onResult(null);
    onLoading(true);

    try {
      const ai = getAiClient();
      const prompt = `Based on the following JSON data for the "${title}" component of a software architecture, please perform the requested action.\n\nData:\n${content}`;
      
      if (action === 'summarize') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${prompt}\n\nAction: Provide a concise summary for a non-technical audience.`,
        });
        onResult(`**Summary:**\n\n${response.text}`);
      } else if (action === 'analyze') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: `${prompt}\n\nAction: Provide a deep, expert-level analysis of this component's strengths, weaknesses, and potential improvements. Be thorough.`,
          config: {
            thinkingConfig: { thinkingBudget: 32768 },
          },
        });
        onResult(`**Deep Analysis:**\n\n${response.text}`);
      } else if (action === 'speak') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-tts',
          contents: [{ parts: [{ text: `Say this summary of the ${title} component: ${JSON.parse(content).inhalt}`}]}],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          },
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContext.destination);
            source.start();
            onResult("Audio playback initiated.");
        } else {
            throw new Error("No audio data received.");
        }
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setLoadingAction(null);
      onLoading(false);
    }
  }, [content, title, onResult, onLoading]);

  const ActionButton: React.FC<{ action: ActionType; label: string; children: React.ReactNode; }> = ({ action, label, children }) => (
    <button
      onClick={() => handleAction(action)}
      disabled={!!loadingAction}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 rounded-md hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label={label}
    >
      {loadingAction === action ? <Spinner /> : children}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="mt-6 pt-4 border-t border-slate-700">
      <h5 className="text-slate-200 font-semibold mb-3">Gemini Actions</h5>
      <div className="flex flex-wrap gap-3">
        <ActionButton action="summarize" label="Summarize">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </ActionButton>
        <ActionButton action="analyze" label="Deep Analysis">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 0011 7v10zM4 17a1 1 0 001.447.894l4-2A1 1 0 0010 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 004 7v10z" /></svg>
        </ActionButton>
        <ActionButton action="speak" label="Read Aloud">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </ActionButton>
      </div>
       {error && <p className="mt-3 text-sm text-red-400">Error: {error}</p>}
    </div>
  );
};
