
export interface ArchitectureComponentDetail {
  inhalt: string;
  aufbau: string;
  zweck: string;
  zugriff: string;
  verwaltung?: string;
  generierung?: string;
  architekturmuster?: string;
  verwaltung_generierung?: string;
  infrastruktur?: string;
}

export type ArchitectureComponentKey = 
  | 'datenbanken'
  | 'schnittstellen_api'
  | 'dashboards_benutzeroberflaeche'
  | 'visualisierungen'
  | 'externe_medien_server_websites';

export type ArchitectureData = {
  [key in ArchitectureComponentKey]: ArchitectureComponentDetail;
};

export interface SoftwareArchitecture {
  software_architektur_ueberblick: ArchitectureData;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface BlueprintPhase {
  title: string;
  description: string;
  tasks: string[];
  duration: string;
}

export interface ApiEndpoint {
  title: string;
  description: string;
  query: string;
  response: string;
}
