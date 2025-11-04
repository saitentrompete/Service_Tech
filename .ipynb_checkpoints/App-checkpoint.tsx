import React from 'react';
import { ArchitectureCard } from './components/ArchitectureCard';
import { Chatbot } from './components/Chatbot';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageStudio } from './components/ImageStudio';
import { GroundingSearch } from './components/GroundingSearch';
import { DevelopmentBlueprint } from './components/DevelopmentBlueprint';
import { ApiDocumentation } from './components/ApiDocumentation';
import { Tabs, Tab } from './components/Tabs';
import { ARCHITECTURE_JSON, DISPLAY_TITLES, ICONS } from './constants';
import { ArchitectureComponentKey } from './types';

function App() {
  const architectureComponents = Object.keys(ARCHITECTURE_JSON.software_architektur_ueberblick) as ArchitectureComponentKey[];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
            Software-Architektur Dashboard
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Ein interaktiver Überblick über die Systemkomponenten, erweitert mit generativen KI-Funktionen.
          </p>
        </header>

        <main>
          <Tabs>
            <Tab title="Architecture Overview">
              <div className="mt-6">
                {architectureComponents.map((key) => (
                  <ArchitectureCard
                    key={key}
                    title={DISPLAY_TITLES[key]}
                    data={ARCHITECTURE_JSON.software_architektur_ueberblick[key]}
                    icon={ICONS[key]}
                  />
                ))}
              </div>
            </Tab>
             <Tab title="Development Blueprint">
              <DevelopmentBlueprint />
            </Tab>
            <Tab title="API Documentation">
              <ApiDocumentation />
            </Tab>
            <Tab title="Image Generation">
               <ImageGenerator />
            </Tab>
            <Tab title="Image Studio">
               <ImageStudio />
            </Tab>
            <Tab title="Grounded Search">
              <GroundingSearch />
            </Tab>
          </Tabs>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;