
import React from 'react';
import { SoftwareArchitecture, ArchitectureComponentKey } from './types';

export const ARCHITECTURE_JSON: SoftwareArchitecture = {
  "software_architektur_ueberblick": {
    "datenbanken": {
      "inhalt": "Speicherung aller betriebs- und ausbildungsrelevanten Daten, darunter: strukturierte Kerndaten (Projekte, Materialstamm, Personal, Finanzen), flexible, dokumentenbasierte Daten (ereignisspezifische Pläne, Checklisten, Kommunikationsprotokolle), Zeitreihendaten von IoT-Sensoren (Betriebsstunden, Temperatur) und Caching-Daten zur Performance-Steigerung.",
      "aufbau": "Es wird ein hybrider Ansatz verfolgt, der die Stärken verschiedener Datenbanktechnologien kombiniert: 1. **PostgreSQL (mit PostGIS):** Für hochstrukturierte, relationale Kerndaten, bei denen Datenintegrität und komplexe Abfragen entscheidend sind. 2. **MongoDB / Firebase Firestore:** Für flexible, oft verschachtelte Dokumente wie vollständige Event-Objekte, die alle Zuweisungen enthalten, was schnelle Lesezugriffe ermöglicht. 3. **InfluxDB:** Spezialisierte Zeitreihendatenbank zur Erfassung von Echtzeit-Monitoring- und IoT-Daten. 4. **Redis:** In-Memory-Datenbank für Caching-Zwecke zur Beschleunigung von Anfragen.",
      "zweck": "Sicherstellung der Datenpersistenz, -integrität und -verfügbarkeit. Die hybride Struktur ermöglicht sowohl transaktionale Sicherheit für Kerndaten (PostgreSQL) als auch hohe Flexibilität und Lesegeschwindigkeit für dynamische Event-Daten (MongoDB). InfluxDB dient der Analyse von Echtzeitdaten für Predictive Maintenance, während Redis die System-Performance optimiert.",
      "zugriff": "Der Zugriff erfolgt ausschließlich über die Backend-Dienste und die definierte API-Schicht. Direkte Datenbankzugriffe von Frontend-Clients sind nicht vorgesehen, um Sicherheit und Datenkonsistenz zu gewährleisten.",
      "verwaltung": "Die Datenbanken werden durch das Backend verwaltet, potenziell unter Verwendung von Object-Relational Mappers (ORM) wie SQLAlchemy. Die Infrastruktur wird als Code (IaC) mit Terraform verwaltet.",
      "architekturmuster": "Die Architektur soll auf Mustern wie CQRS (Command Query Responsibility Segregation) und Event Sourcing basieren. Dies trennt Schreib- von Leseoperationen für optimale Performance und Skalierbarkeit und schafft durch die Speicherung aller Zustandsänderungen als Events einen vollständigen, nachvollziehbaren Audit-Trail."
    },
    "schnittstellen_api": {
      "inhalt": "Die Schnittstellen transportieren alle Daten zwischen Clients und Server, z.B. Projektdaten, Materialinformationen, Personaldaten, Aufgabenstatus sowie Befehle zur Datenmanipulation und Echtzeit-Updates.",
      "aufbau": "Eine Multi-API-Strategie ist vorgesehen: 1. **GraphQL:** Als primäre API für die Kommunikation mit den verschiedenen Frontend-Clients (Dashboard, Mobile App, Portale). Ermöglicht es den Clients, passgenau die benötigten Daten in einer einzigen Anfrage abzurufen. 2. **REST:** Für die interne Kommunikation zwischen Microservices oder für einfache, ressourcenorientierte CRUD-Operationen. 3. **WebSockets:** Für Echtzeit-Kommunikation, z.B. für Live-Updates in Dashboards oder Chat-Funktionen. 4. **Spezialisierte Schnittstellen:** OData und SAP-IDoc für ERP-Integrationen und xAPI für die Kommunikation mit dem Lern-Management-System (LMS).",
      "zweck": "Entkopplung von Frontend- und Backend-Entwicklung. Ermöglichung des 'Ökosystem'-Ansatzes, bei dem verschiedene, spezialisierte Anwendungen auf eine zentrale Datenbasis zugreifen. Integration mit Drittsystemen wie ERP, LMS oder externen Partnern.",
      "zugriff": "Der Zugriff ist durch eine robuste Sicherheitsarchitektur geschützt, die auf JSON Web Tokens (JWT) für die Authentifizierung und eine serverseitige, rollenbasierte Zugriffskontrolle (RBAC) für die Autorisierung setzt. Die gesamte Kommunikation erfolgt verschlüsselt (TLS/HTTPS).",
      "generierung": "Die API-Endpunkte werden durch die Backend-Services (primär Node.js/Express, sekundär Python/FastAPI) bereitgestellt. Die Dokumentation kann durch Standards wie OpenAPI automatisiert generiert werden."
    },
    "dashboards_benutzeroberflaeche": {
      "inhalt": "Anzeige und Verwaltung aller relevanten Informationen: Projektübersichten, Zeitpläne, Ressourcen (Material, Personal), Aufgaben und Checklisten, Lagerbestände, Lerninhalte für Azubis, Finanzdaten und Berichte.",
      "aufbau": "Die Benutzeroberfläche (UI) ist als Progressive Web Application (PWA) konzipiert, entwickelt mit React.js. Kernmerkmale sind: 1. **Rollenbasierte Dashboards:** Angepasste Ansichten für unterschiedliche Nutzergruppen (Techniker, Projektmanager, Azubi, Admin, externe Partner). 2. **Widget-System:** Individuell per Drag-and-Drop konfigurierbare Dashboards. 3. **Offline-Fähigkeit & Responsive Design:** Die Anwendung funktioniert auch ohne Internetverbindung und passt sich an verschiedene Bildschirmgrößen an. 4. **Barrierefreiheit:** Konform nach WCAG 2.1 AA. 5. **Kontext-sensitive UI:** Die Oberfläche passt sich der aktuellen Aufgabe des Nutzers an.",
      "zweck": "Zentrale, interaktive Schnittstelle für alle Nutzer zur Planung, Steuerung und Überwachung aller betrieblichen Prozesse. Schaffung einer 'Single Source of Truth' und Abbau von Informationssilos.",
      "zugriff": "Der Zugriff erfolgt rollenbasiert. Jeder Nutzer sieht nur die für seine Rolle relevanten Daten und Funktionen. Ein Login ist erforderlich.",
      "verwaltung_generierung": "Die Inhalte werden dynamisch aus der zentralen Datenbank über die GraphQL-API geladen und dargestellt. Nutzer können Daten direkt über die Formulare und interaktiven Elemente der Oberfläche erstellen und bearbeiten."
    },
    "visualisierungen": {
      "inhalt": "Grafische und interaktive Darstellungen von komplexen Daten und Strukturen, z.B. Lagerlayout, Projektfortschritt, virtuelle Event-Setups und Simulationsergebnisse.",
      "aufbau": "1. **Projektplanung:** Visuelle Darstellungen als Zeitleisten, Gantt-Diagramme und Kanban-Boards. 2. **Lagerverwaltung:** 3D-/AR-Visualisierung der Lagerstruktur zur besseren Orientierung. 3. **Digitaler Zwilling:** Maßstabsgetreue, dynamische 3D-Modelle von Veranstaltungsorten und kompletten Event-Setups. Basiert auf einer 3D-Engine (Unity oder WebGL/Three.js) und integriert CAD-Importe (z.B. Vectorworks, Blender).",
      "zweck": "Verbesserung des Verständnisses und der Planbarkeit. Die 3D/AR-Lageransicht erleichtert die Materialfindung. Der Digitale Zwilling ermöglicht virtuelle Aufbauten, Kollisionsprüfungen, die Simulation von Besucherströmen (Crowd-Simulation) und dient als immersives Werkzeug für Vertrieb und Marketing.",
      "zugriff": "Die Visualisierungen sind als Komponenten in die Haupt-Dashboards und in die mobile Anwendung (insbesondere AR-Funktionen) integriert.",
      "generierung": "Die Visualisierungen werden dynamisch generiert. Projektpläne basieren auf den Projektdaten. Der Digitale Zwilling wird auf Basis von CAD-Daten oder 3D-Scans erstellt und mit Echtzeit-Daten aus IoT-Sensoren und der Plattform angereichert."
    },
    "externe_medien_server_websites": {
      "inhalt": "Die Architektur ist als ein Ökosystem konzipiert, das über die Kernanwendung hinausgeht und spezialisierte externe Anwendungen umfasst. Dazu gehören öffentliche Event-Informationen, Verfügbarkeiten und Profile von Freelancern sowie spezifische Werkzeuge für das Lagerpersonal.",
      "aufbau": "Das Ökosystem besteht aus mehreren, entkoppelten Anwendungen, die alle auf die zentrale API zugreifen: 1. **Öffentliche Event-Website ('Litfaßsäule'):** Eine reine Lesezugriffs-Anwendung zur Vermarktung von Veranstaltungen. 2. **Lagerverwaltungs-App ('Werkstatt'):** Eine für Tablets optimierte App zur Verwaltung von Beständen, Check-in/out-Prozessen per RFID/Barcode und Wartungsprotokollen. 3. **Freelancer-Portal ('Büro'):** Ein Web-Portal für interne und externe Mitarbeiter zur Verwaltung von Verfügbarkeiten, Einsatzplänen und zur Zeiterfassung/Rechnungsstellung.",
      "zweck": "Bereitstellung spezialisierter und optimierter Werkzeuge für verschiedene Nutzergruppen und Anwendungsfälle. Trennung von internen Management-Funktionen und öffentlich zugänglichen Informationen. Stärkung des Community- und Netzwerkgedankens.",
      "zugriff": "Die öffentliche Website ist für jeden zugänglich. Die Lager-App und das Freelancer-Portal erfordern einen spezifischen Login mit entsprechenden Berechtigungen.",
      "infrastruktur": "Die gesamte Server-Infrastruktur ist Cloud-basiert (AWS, Azure, Google Cloud) und wird durch Containerisierung (Docker) und Orchestrierung (Kubernetes) verwaltet. Eine automatisierte CI/CD-Pipeline (z.B. mit GitHub Actions) sorgt für die Bereitstellung."
    }
  }
};

export const DISPLAY_TITLES: Record<ArchitectureComponentKey, string> = {
  datenbanken: "Datenbanken",
  schnittstellen_api: "Schnittstellen & API",
  dashboards_benutzeroberflaeche: "Dashboards & Benutzeroberfläche",
  visualisierungen: "Visualisierungen",
  externe_medien_server_websites: "Externe Systeme & Infrastruktur",
};

export const ICONS: Record<ArchitectureComponentKey, React.ReactNode> = {
  datenbanken: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  schnittstellen_api: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  dashboards_benutzeroberflaeche: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  visualisierungen: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  externe_medien_server_websites: (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.122a.5.5 0 01.707 0l2.122 2.122a.5.5 0 00.707 0l2.121-2.121a.5.5 0 01.707 0l2.122 2.122a.5.5 0 00.707 0l2.121-2.121a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707l-2.121 2.121a.5.5 0 000 .707l2.121 2.121a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0l-2.121-2.121a.5.5 0 00-.707 0l-2.122 2.121a.5.5 0 01-.707 0l-2.121-2.121a.5.5 0 00-.707 0l-2.122 2.121a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l2.121-2.121a.5.5 0 000-.707L3.762 4.829a.5.5 0 010-.707l.707-.707z" />
    </svg>
  ),
};
