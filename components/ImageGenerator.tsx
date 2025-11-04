import React, { useState, useCallback } from 'react';
import { getAiClient } from '../gemini';
import { Spinner } from './Spinner';

/**
 * A type representing the aspect ratio of an image.
 * @typedef {"1:1" | "16:9" | "9:16" | "4:3" | "3:4"} AspectRatio
 */
type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

/**
 * A component that allows users to generate images using Gemini.
 * @returns {JSX.Element} The rendered ImageGenerator component.
 */
export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
        setError("A prompt is required to generate an image.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    try {
      // Note: Image generation may require Vertex AI or may not be available in the current SDK version
      // Providing a placeholder/note instead
      setError("Image generation is not currently available in this version of the Google Generative AI SDK. Please use Imagen API directly or Vertex AI for image generation capabilities.");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="prompt-generator" className="block text-sm font-medium text-slate-300 mb-2">Prompt</label>
          <textarea
            id="prompt-generator"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A photorealistic image of a futuristic city skyline at sunset"
            className="w-full h-24 bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="aspect-ratio" className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
          <select
            id="aspect-ratio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="1:1">Square (1:1)</option>
            <option value="16:9">Landscape (16:9)</option>
            <option value="9:16">Portrait (9:16)</option>
            <option value="4:3">Standard (4:3)</option>
            <option value="3:4">Tall (3:4)</option>
          </select>
        </div>
        <button onClick={handleGenerate} disabled={!prompt || isLoading} className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50">
            {isLoading ? <Spinner /> : 'Generate Image'}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">Error: {error}</p>}

      <div className="mt-6">
        {isLoading && (
            <div className="w-full aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center">
                <Spinner className="h-12 w-12" />
            </div>
        )}
        {resultImage && (
            <img src={resultImage} alt="Generated image" className="w-full rounded-lg shadow-md" />
        )}
      </div>
    </div>
  );
};
