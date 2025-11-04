# GitHub Copilot Instructions for Service_Tech

## Project Overview

**Software Architecture Visualizer with Gemini AI**

This is an interactive web application that visualizes and explores software architecture for event management and technical services. The application is enhanced with Google Gemini AI for analysis, content generation, grounded search, and image generation capabilities.

### Purpose
- Visualize complex software architecture for event management systems
- Provide interactive dashboards for different system components
- Demonstrate integration with Gemini AI for various generative capabilities
- Serve as a blueprint for full-stack event management software

## Architecture & Technology Stack

### Core Technologies
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 6.2.0
- **Language**: TypeScript 5.8.2
- **AI Integration**: Google Gemini AI (@google/genai 1.x)
- **Styling**: Tailwind CSS (via inline classes)

### Application Type
- Progressive Web Application (PWA) concept
- Single Page Application (SPA)
- Client-side rendered with AI integration

### Key Features
1. **Architecture Overview**: Interactive cards displaying system components
2. **Development Blueprint**: Phased development roadmap
3. **API Documentation**: GraphQL API examples and patterns
4. **Image Generation**: AI-powered image creation
5. **Image Studio**: Advanced image manipulation with Gemini
6. **Grounded Search**: AI search with real-world grounding
7. **Chatbot**: Conversational AI assistant for architecture queries

## File Structure & Organization

### Root Level Files
- `App.tsx` - Main application component with routing/tabs
- `index.tsx` - Application entry point
- `index.html` - HTML template
- `types.ts` - TypeScript type definitions
- `constants.tsx` - Architecture data and display configuration
- `gemini.ts` - Gemini AI client initialization
- `utils.ts` - Utility functions (blob/audio handling)
- `apiDocumentationData.ts` - API documentation examples
- `developmentBlueprintData.ts` - Development phases data

### Component Directory (`/components`)
All React components follow PascalCase naming:
- `ArchitectureCard.tsx` - Expandable architecture component cards
- `Chatbot.tsx` - AI-powered chat interface
- `DevelopmentBlueprint.tsx` - Development roadmap display
- `ApiDocumentation.tsx` - API documentation viewer
- `ImageGenerator.tsx` - Image generation interface
- `ImageStudio.tsx` - Advanced image manipulation
- `GroundingSearch.tsx` - Grounded search functionality
- `GeminiActions.tsx` - Reusable Gemini action buttons
- `Tabs.tsx` - Tab navigation component
- `Spinner.tsx` - Loading indicator

### Configuration Files
- `vite.config.ts` - Vite build configuration with environment variables
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts
- `metadata.json` - Application metadata

## Development Workflows

### Available Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Environment Setup
- Requires `GEMINI_API_KEY` in `.env.local`
- API key is injected via Vite's define plugin as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

### Development Server
- Runs on port 3000
- Host: 0.0.0.0 (accessible from network)
- Hot module replacement enabled

## Code Conventions & Patterns

### Component Structure
1. **Functional Components**: All components use React function components with hooks
2. **TypeScript**: Strict typing with interfaces defined in `types.ts`
3. **Props Interface**: Each component defines its own Props interface
4. **File Organization**: One component per file, named identically to component

### React Patterns
```typescript
// Standard component structure
import React, { useState } from 'react';
import type { ComponentProps } from '../types';

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    // JSX with Tailwind classes
  );
};
```

### State Management
- **Local State**: useState for component-level state
- **Refs**: useRef for DOM references and persistent values
- **Effects**: useEffect for side effects and lifecycle

### Styling Conventions
- **Utility-First CSS**: Tailwind CSS classes inline
- **Color Palette**: 
  - Background: `slate-900`, `slate-800`
  - Text: `slate-100`, `slate-200`, `slate-300`, `slate-400`
  - Accents: `cyan-400`, `cyan-500`, `emerald-400/500`, `sky-400`, `indigo-400`, `amber-400`, `rose-400`
- **Dark Theme**: All components use dark mode by default
- **Responsive**: Mobile-first with md: breakpoints
- **Interactive States**: hover:, focus:, disabled: variants

### TypeScript Patterns
- **Type Imports**: Use `import type` for type-only imports
- **Interfaces Over Types**: Prefer interfaces for object shapes
- **Strict Null Checks**: Handle undefined/null cases
- **Generic Constraints**: Use generic types where appropriate

## AI Integration Patterns (Gemini)

### Client Initialization
```typescript
import { getAiClient } from './gemini';

const ai = getAiClient();
```

### Common Gemini Features Used
1. **Chat API**: Multi-turn conversations with history
2. **Streaming**: Real-time response streaming
3. **Content Generation**: Text and image generation
4. **Grounding**: Search-grounded responses
5. **Image Analysis**: Vision capabilities

### Error Handling
- Wrap AI calls in try-catch blocks
- Provide user-friendly error messages
- Log detailed errors to console for debugging
- Handle loading states with spinners

### Model Selection
- Primary model: `gemini-2.5-flash`
- Vision tasks: `gemini-2.5-flash` (supports multimodal)

## Component Guidelines

### Architecture Cards
- Expandable/collapsible design
- Detail sections with formatted HTML (dangerouslySetInnerHTML)
- Bold text: `**text**` converted to `<strong>`
- Integration with GeminiActions for AI analysis

### Tabs Component
- Controlled tabs with active state
- Renders only active tab content
- Accessible with ARIA attributes

### AI-Powered Components
- Loading states with Spinner component
- Error states with user-friendly messages
- Streaming support for real-time updates
- State management for async operations

## Data Patterns

### Architecture Data
- Structured in `constants.tsx` as `ARCHITECTURE_JSON`
- German language content (application is in German)
- Hierarchical structure: `software_architektur_ueberblick` > components
- Each component has: inhalt, aufbau, zweck, zugriff, verwaltung, etc.

### Type Definitions
```typescript
// Core architecture types
ArchitectureComponentDetail - Individual component data
ArchitectureComponentKey - Valid component keys
ArchitectureData - Collection of components
SoftwareArchitecture - Top-level structure

// Chat types
ChatMessage - Message structure for Gemini chat
BlueprintPhase - Development phase structure
ApiEndpoint - API documentation structure
```

## Configuration Details

### Path Aliases
- `@/*` resolves to project root
- Configured in both tsconfig.json and vite.config.ts

### Module System
- ES Modules (`"type": "module"` in package.json)
- ESNext module format
- Bundler module resolution

### TypeScript Configuration
- Target: ES2022
- JSX: react-jsx (automatic runtime)
- Strict type checking
- Experimental decorators enabled
- No emit (Vite handles compilation)

## Best Practices for AI Coding Agents

### When Adding Features
1. **Follow existing patterns**: Match the style and structure of existing components
2. **Type everything**: Add TypeScript interfaces for all new data structures
3. **Use Tailwind**: Apply consistent styling with existing color palette
4. **Handle loading/error states**: Always provide feedback for async operations
5. **Test with Gemini API**: Ensure AI features work with actual API calls

### When Modifying Components
1. **Preserve accessibility**: Maintain ARIA attributes and semantic HTML
2. **Keep responsiveness**: Use responsive Tailwind classes
3. **Maintain dark theme**: All changes should work with dark background
4. **Update types**: Modify TypeScript interfaces as needed

### When Working with AI Features
1. **Check API key**: Ensure `GEMINI_API_KEY` is configured
2. **Handle rate limits**: Consider rate limiting and quota management
3. **Stream when possible**: Use streaming APIs for better UX
4. **Validate input**: Sanitize user input before sending to AI

### When Updating Dependencies
1. **Check compatibility**: Verify React 19 and Vite 6 compatibility
2. **Test AI integration**: Gemini API changes may require code updates
3. **Update types**: Install corresponding @types packages

## Domain Context

This application is designed for an event management and technical services company. Key domain concepts:

- **Event Management**: Projects, resources, personnel, materials
- **Technical Services**: Stage setup, lighting, sound, logistics
- **Warehouse Management**: Inventory, RFID/barcode tracking
- **Training**: Apprentice (Azubi) learning management
- **Architecture Components**:
  - Databases (PostgreSQL, MongoDB, InfluxDB, Redis)
  - APIs (GraphQL, REST, WebSockets, xAPI)
  - Dashboards (PWA, role-based, widgets)
  - Visualizations (3D, AR, digital twin)
  - External Systems (freelancer portal, warehouse app)

## Common Patterns to Follow

### HTML Content Rendering
```typescript
dangerouslySetInnerHTML={{ 
  __html: content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />') 
}}
```

### Gemini Streaming Pattern
```typescript
const stream = await ai.model.generateContentStream({ message });
for await (const chunk of stream) {
  // Update state with chunk.text
}
```

### Loading State Pattern
```typescript
const [isLoading, setIsLoading] = useState(false);
const [result, setResult] = useState<string | null>(null);

// Show spinner when loading
{isLoading && <Spinner />}
{result && <div>{result}</div>}
```

## Notes for AI Agents

- This is a demonstration/visualization project, not a production system
- The actual backend architecture described in the data is aspirational
- Focus on clean, readable code over optimization
- Maintain the visual consistency and dark theme
- Keep German language content intact (UI can be English or German)
- The application showcases AI capabilities - keep AI features prominent

## Testing Considerations

- No formal test suite currently exists
- Manual testing in browser is required
- Test with actual Gemini API for AI features
- Verify responsive design at different breakpoints
- Check accessibility with screen readers
- Test loading and error states

---

**Last Updated**: 2025-11-04  
**Version**: 1.0
