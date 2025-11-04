import React, { useState, useCallback, useRef } from 'react';
import { getAiClient } from '../gemini';
import { Modality } from '@google/genai';
import { blobToBase64 } from '../utils';
import { Spinner } from './Spinner';

/**
 * A component that allows users to upload, analyze, and edit images using Gemini.
 * @returns {JSX.Element} The rendered ImageStudio component.
 */
export const ImageStudio: React.FC = () => {
  const [image, setImage] = useState<{ url: string; base64: string; mimeType: string; } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setImage(null);
    setPrompt('');
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      blobToBase64(file).then(base64 => {
        setImage({ url, base64, mimeType: file.type });
        setResult(null);
        setError(null);
      });
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!image) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const ai = getAiClient();
      const imagePart = { inlineData: { data: image.base64, mimeType: image.mimeType } };
      const textPart = { text: prompt || "Describe this image in detail." };
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
      });
      setResult(response.text);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [image, prompt]);

  const handleEdit = useCallback(async () => {
    if (!image || !prompt) {
        setError('An image and a text prompt are required for editing.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const ai = getAiClient();
      const imagePart = { inlineData: { data: image.base64, mimeType: image.mimeType } };
      const textPart = { text: prompt };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [imagePart, textPart] },
        config: { responseModalities: [Modality.IMAGE] },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData) {
        const newBase64 = part.inlineData.data;
        const newMimeType = part.inlineData.mimeType;
        const newImageUrl = `data:${newMimeType};base64,${newBase64}`;
        setImage({ url: newImageUrl, base64: newBase64, mimeType: newMimeType });
      } else {
        throw new Error("No edited image data received.");
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [image, prompt]);

  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <div className="flex justify-end mb-2">
        <button 
          onClick={handleClear} 
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
          title="Alles löschen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          Alles löschen
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image</label>
          <div 
            className="w-full h-64 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-slate-400 cursor-pointer hover:border-cyan-400 hover:text-cyan-400 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image.url} alt="Upload preview" className="max-h-full max-w-full object-contain rounded-md" />
            ) : (
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p>Click to upload</p>
              </div>
            )}
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
        <div>
          <label htmlFor="prompt-studio" className="block text-sm font-medium text-slate-300 mb-2">Prompt (optional for analysis)</label>
          <textarea
            id="prompt-studio"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Describe this image, or, Add a retro filter"
            className="w-full h-36 bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
          <div className="flex space-x-3 mt-3">
             <button onClick={handleAnalyze} disabled={!image || isLoading} className="flex-1 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50">
              {isLoading ? <Spinner /> : 'Analyze'}
            </button>
             <button onClick={handleEdit} disabled={!image || !prompt || isLoading} className="flex-1 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {isLoading ? <Spinner /> : 'Edit'}
            </button>
          </div>
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">Error: {error}</p>}
      {(isLoading || result) && (
        <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            {isLoading && !result && <div className="flex items-center justify-center p-8"><Spinner className="h-8 w-8" /></div>}
            {result && <p className="text-slate-300 whitespace-pre-wrap">{result}</p>}
        </div>
      )}
    </div>
  );
};
