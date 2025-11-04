import React, { useState, useCallback } from 'react';
import { API_DOCUMENTATION_DATA } from '../apiDocumentationData';
import type { ApiEndpoint } from '../types';
import { getAiClient } from '../gemini';
import { Type } from '@google/genai';
import { Spinner } from './Spinner';

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => (
  <pre className="bg-slate-900/70 rounded-md p-4 text-sm text-slate-200 overflow-x-auto">
    <code className={`language-${language}`}>
      {code.trim()}
    </code>
  </pre>
);

export const ApiDocumentation: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<ApiEndpoint>(API_DOCUMENTATION_DATA[0]);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Based on the provided software architecture for "MaxTech" (an event management platform), generate a new, plausible example of a GraphQL mutation. Provide the mutation, example variables, and an example JSON response. The existing API includes queries for projects and a mutation to create projects. Suggest a new mutation, for example, to assign a material to a project or update a project's status. Format the output clearly with sections for "Mutation:", "Variables:", and "Response:".`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "A short title for the new mutation example." },
                        description: { type: Type.STRING, description: "A brief description of what the mutation does." },
                        mutation: { type: Type.STRING, description: "The GraphQL mutation string." },
                        variables: { type: Type.STRING, description: "An example variables JSON object as a string." },
                        response: { type: Type.STRING, description: "An example response JSON object as a string." },
                    },
                    required: ["title", "description", "mutation", "variables", "response"]
                },
            },
        });

        const generatedJson = JSON.parse(response.text);
        const formattedResult = `
### ${generatedJson.title}
**Description**: ${generatedJson.description}

**Mutation:**
\`\`\`graphql
${generatedJson.mutation.trim()}
\`\`\`

**Variables:**
\`\`\`json
${generatedJson.variables.trim()}
\`\`\`

**Response:**
\`\`\`json
${generatedJson.response.trim()}
\`\`\`
        `;
        setGeneratedContent(formattedResult);

    } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred while generating the example.');
    } finally {
        setIsLoading(false);
    }
  }, []);

  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">GraphQL API Documentation</h2>
      <p className="text-slate-400 mb-8">
        Live examples of queries and mutations for interacting with the MaxTech platform.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/3 lg:w-1/4">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Endpoints</h3>
          <nav>
            <ul>
              {API_DOCUMENTATION_DATA.map((endpoint) => (
                <li key={endpoint.title}>
                  <button
                    onClick={() => setActiveEndpoint(endpoint)}
                    className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                      activeEndpoint.title === endpoint.title
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                    }`}
                  >
                    {endpoint.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
            <div className="mt-8">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full justify-center inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                    {isLoading ? <Spinner /> : <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
                    Generate Example with Gemini
                </button>
            </div>
        </aside>

        <main className="flex-1 min-w-0">
          <article className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">{activeEndpoint.title}</h3>
            <p className="text-slate-400">{activeEndpoint.description}</p>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2">Example Query</h4>
              <CodeBlock code={activeEndpoint.query} language="graphql" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2">Example Response</h4>
              <CodeBlock code={activeEndpoint.response} language="json" />
            </div>
          </article>

          {(isLoading || generatedContent || error) && (
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-xl font-bold text-slate-100 mb-4">Gemini Generated Example</h3>
                 {isLoading && <div className="flex justify-center p-8"><Spinner className="h-10 w-10" /></div>}
                 {error && <p className="text-red-400">Error: {error}</p>}
                 {generatedContent && (
                    <div
                        className="prose prose-sm prose-invert text-slate-300"
                        dangerouslySetInnerHTML={{ __html: generatedContent.replace(/```(graphql|json)\n([\s\S]*?)```/g, '<pre class="bg-slate-900/70 rounded-md p-4 text-slate-200 overflow-x-auto"><code>$2</code></pre>').replace(/### (.*)/g, '<h3 class="text-lg font-bold text-slate-100">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                 )}
              </div>
          )}
        </main>
      </div>
    </div>
  );
};