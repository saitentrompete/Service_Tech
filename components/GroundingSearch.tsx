import React, { useState, useCallback, useEffect } from 'react';
import { getAiClient } from '../gemini';
import { Spinner } from './Spinner';

/**
 * An interface representing a geographic location.
 * @property {number} latitude - The latitude of the location.
 * @property {number} longitude - The longitude of the location.
 */
interface Geolocation {
  latitude: number;
  longitude: number;
}

/**
 * A component that allows users to perform a grounded search using Gemini.
 * @returns {JSX.Element} The rendered GroundingSearch component.
 */
export const GroundingSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useLocation && !location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setUseLocation(false);
        }
      );
    }
  }, [useLocation, location]);

  const handleSearch = useCallback(async () => {
    if (!query) {
        setError("Please enter a search query.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const ai = getAiClient();
      const model = ai.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        tools: [{ googleSearch: {} }]
      });
      
      const result = await model.generateContent(query);
      
      const response = result.response;
      setResult({
        text: response.text(),
        metadata: response.candidates?.[0]?.groundingMetadata,
      });

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query, useLocation, location]);

  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="search-query" className="block text-sm font-medium text-slate-300 mb-2">Search Query</label>
          <input
            id="search-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., What are the best practices for CQRS?"
            className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <input
            id="use-location"
            type="checkbox"
            checked={useLocation}
            onChange={(e) => setUseLocation(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <label htmlFor="use-location" className="ml-2 block text-sm text-slate-300">
            Use my location (for Maps-related queries)
          </label>
        </div>
        <button onClick={handleSearch} disabled={!query || isLoading} className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50">
            {isLoading ? <Spinner /> : 'Search'}
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">Error: {error}</p>}
      <div className="mt-6">
        {isLoading && <div className="flex justify-center p-8"><Spinner className="h-10 w-10" /></div>}
        {result && (
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 space-y-4">
            <p className="text-slate-200 whitespace-pre-wrap">{result.text}</p>
            {result.metadata?.groundingChunks?.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-300 text-sm">Sources:</h4>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  {result.metadata.groundingChunks.map((chunk: any, index: number) => {
                    const source = chunk.web || chunk.maps;
                    if (!source?.uri) return null;
                    return (
                        <li key={index}>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                                {source.title || source.uri}
                            </a>
                        </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
