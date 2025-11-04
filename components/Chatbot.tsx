import React, { useState, useEffect, useRef } from 'react';
import { getAiClient } from '../gemini';
import { ARCHITECTURE_JSON } from '../constants';
import type { ChatSession } from '@google/generative-ai';
import type { ChatMessage } from '../types';
import { Spinner } from './Spinner';

/**
 * A chatbot component that allows users to ask questions about the software architecture.
 * @returns {JSX.Element} The rendered chatbot component.
 */
export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      const initialHistory: ChatMessage[] = [
        {
          role: 'user',
          parts: [{ text: `You are an expert assistant specializing in software architecture. Your task is to answer questions based on the following JSON data. Be helpful and clear in your explanations.\n\nData:\n${JSON.stringify(ARCHITECTURE_JSON)}` }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am ready to answer your questions about this software architecture. How can I help you?' }],
        },
      ];
      const ai = getAiClient();
      const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      chatRef.current = model.startChat({
        history: initialHistory,
      });
      setMessages([initialHistory[1]]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage, { role: 'model', parts: [{ text: ''}] }]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream(currentInput);
      
      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        setMessages(prev => {
            const lastMessageIndex = prev.length - 1;
            const updatedMessages = [...prev];
            if (updatedMessages[lastMessageIndex]?.role === 'model') {
                updatedMessages[lastMessageIndex] = {
                    ...updatedMessages[lastMessageIndex],
                    parts: [{ text }],
                };
            }
            return updatedMessages;
        });
      }
    } catch (error) {
      // Enhanced logging for better debugging
      console.error("Chatbot sendMessageStream failed:", error);
      
      // Provide a more specific and user-friendly error message
      const errorMessage = "I'm having trouble connecting right now. Please check your internet connection or try again in a moment.";

       setMessages(prev => {
            const lastMessageIndex = prev.length - 1;
            const updatedMessages = [...prev];
            if (updatedMessages[lastMessageIndex]?.role === 'model') {
                updatedMessages[lastMessageIndex] = {
                    ...updatedMessages[lastMessageIndex],
                    parts: [{ text: errorMessage }],
                };
            }
            return updatedMessages;
        });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h7a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-slate-800 border border-slate-700 rounded-xl shadow-2xl flex flex-col z-50">
      <header className="flex items-center justify-between p-4 border-b border-slate-700">
        <h3 className="font-bold text-lg text-slate-100">Architecture Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white" aria-label="Close chat">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'model' && (
            <div className="flex justify-start">
                 <div className="max-w-[80%] rounded-lg px-4 py-2 bg-slate-700 text-slate-200 flex items-center">
                    <Spinner className="h-4 w-4 mr-2" /> Thinking...
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-full py-2 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};