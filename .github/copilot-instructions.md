# AI Coding Agent Instructions for Service_Tech

## Project Overview

**Service_Tech** is a Software Architecture Dashboard - an interactive Progressive Web Application (PWA) that provides a comprehensive overview of a complex event management software architecture enhanced with Google Gemini AI capabilities. The application is built with React, TypeScript, and Vite, featuring real-time AI-powered content analysis, image generation, and conversational assistance.

### Core Purpose
- Visualize and explore software architecture components for an event management platform
- Provide AI-enhanced documentation, analysis, and content generation capabilities
- Serve as both a demonstration and practical tool for understanding complex system architectures
- Showcase integration patterns with Google's Gemini AI API

## Architecture & Technology Stack

### Frontend Framework
- **React 19.2.0** with TypeScript (strict mode enabled)
- **Vite 6.2.0** as build tool and dev server
- **Progressive Web App (PWA)** architecture for offline capabilities
- No UI framework - uses custom Tailwind CSS-inspired utility classes inline

### AI Integration
- **@google/genai (v1.28.0)** - Google's Generative AI SDK
- Multiple Gemini models used:
  - `gemini-2.5-flash` - Fast content generation and chat
  - `gemini-2.5-pro` - Deep analysis with thinking budget (32768 tokens)
  - `gemini-2.5-flash-preview-tts` - Text-to-speech synthesis
  - `imagen-4.0-generate-001` - Image generation

### Build & Development Tools
- TypeScript 5.8.2 with ESNext module system
- Vite plugin for React (@vitejs/plugin-react)
- Environment variable management via `.env.local`
- Path aliases: `@/*` maps to project root

### Key Configuration Files
- **vite.config.ts**: Dev server on port 3000, env var injection for `GEMINI_API_KEY`
- **tsconfig.json**: ES2022 target, bundler module resolution, experimental decorators
- **package.json**: Module type, scripts for dev/build/preview
- **.gitignore**: Standard Node.js patterns (node_modules, dist, .local files)

## Project Structure & File Organization

```
/
├── .github/
│   └── copilot-instructions.md     # This file - AI agent guidance
├── components/                      # React components
│   ├── ApiDocumentation.tsx        # GraphQL API examples with Gemini generation
│   ├── ArchitectureCard.tsx        # Expandable architecture component cards
│   ├── Chatbot.tsx                 # AI assistant with streaming responses
│   ├── DevelopmentBlueprint.tsx    # Project roadmap visualization
│   ├── GeminiActions.tsx           # Summarize/Analyze/Speak actions
│   ├── GroundingSearch.tsx         # Grounded search functionality
│   ├── ImageGenerator.tsx          # Imagen-based image creation
│   ├── ImageStudio.tsx             # Upload, analyze, edit images
│   ├── Spinner.tsx                 # Loading indicator component
│   └── Tabs.tsx                    # Tab navigation component
├── App.tsx                         # Root application component
├── index.tsx                       # React DOM mount point
├── constants.tsx                   # Architecture data and UI constants
├── types.ts                        # TypeScript type definitions
├── apiDocumentationData.ts         # GraphQL API examples data
├── developmentBlueprintData.ts     # Development phases data
├── gemini.ts                       # AI client initialization
├── utils.ts                        # Blob/audio conversion utilities
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

## Coding Conventions & Patterns

### Component Architecture
1. **Functional Components Only**: All components use React function component pattern with hooks
2. **TypeScript Props Interfaces**: Every component defines explicit prop interfaces (e.g., `ArchitectureCardProps`)
3. **State Management**: useState and useCallback hooks for local state, no external state library
4. **Refs for External Objects**: useRef for maintaining AI chat sessions and DOM elements

### TypeScript Patterns
- **Strict Typing**: All props, state, and function parameters are explicitly typed
- **Type Exports**: Common types exported from `types.ts` for reuse
- **Enum-like Types**: Union types for constrained values (e.g., `AspectRatio`, `ActionType`)
- **Generic Record Types**: Used for mapping keys to values (e.g., `Record<ArchitectureComponentKey, string>`)

### Naming Conventions
- **Components**: PascalCase (e.g., `ArchitectureCard`, `ImageGenerator`)
- **Files**: Match component names exactly (e.g., `ArchitectureCard.tsx`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `ARCHITECTURE_JSON`, `DISPLAY_TITLES`)
- **Functions**: camelCase (e.g., `handleAction`, `getAiClient`)
- **Types/Interfaces**: PascalCase (e.g., `ChatMessage`, `ApiEndpoint`)

### Styling Approach
- **Inline Utility Classes**: Tailwind CSS-like utility classes applied directly to elements
- **Color Scheme**: Dark theme using slate-* color palette (slate-900 bg, slate-100 text)
- **Accent Colors**: cyan-* for primary actions, emerald-* for success, rose-* for external systems
- **Responsive**: Mobile-first with md: and lg: breakpoints
- **Focus States**: Always include focus:ring-* for accessibility

### State Management Patterns
- **Loading States**: Boolean `isLoading` state with disabled buttons during operations
- **Error Handling**: String `error` state for user-facing error messages
- **Optimistic Updates**: Add placeholder messages before API responses
- **Streaming Updates**: Real-time UI updates during Gemini streaming responses

### AI Integration Patterns
1. **Lazy Client Initialization**: `getAiClient()` creates new client instances on demand
2. **Environment Variables**: API keys accessed via `process.env.API_KEY` (injected by Vite)
3. **Streaming Responses**: Use async iteration (`for await`) with chunk updates
4. **Error Boundaries**: Try-catch blocks with user-friendly error messages
5. **Response Validation**: Check for expected data structure before using

## Developer Workflows

### Setup & Installation
```bash
# Clone and navigate to project
git clone https://github.com/saitentrompete/Service_Tech.git
cd Service_Tech

# Install dependencies
npm install

# Create environment file
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Cycle
1. **Component Development**: Create new components in `/components` directory
2. **Type Definitions**: Add types to `types.ts` or component-local interfaces
3. **Data Management**: Add static data to appropriate `*Data.ts` files
4. **Testing**: Manual testing via dev server (no automated test suite currently)
5. **Building**: Run `npm run build` to verify production build succeeds

### Environment Variables Required
- `GEMINI_API_KEY`: Google Gemini API key (obtain from Google AI Studio)
  - Set in `.env.local` file (not committed to git)
  - Accessed in code as `process.env.API_KEY` or `process.env.GEMINI_API_KEY`

### Common Development Tasks
- **Add New Tab**: Update `App.tsx` to add `<Tab>` component and corresponding content
- **New Architecture Section**: Add to `ARCHITECTURE_JSON` in `constants.tsx`
- **New Component**: Create in `/components`, import in `App.tsx`, follow existing patterns
- **Modify Gemini Prompts**: Edit prompt strings in respective component action handlers
- **Adjust Styling**: Modify inline className strings following Tailwind patterns

## Integration Points & Dependencies

### External APIs
1. **Google Gemini API**
   - **Authentication**: API key via environment variable
   - **Models Used**: Flash (chat/generation), Pro (analysis), TTS (audio), Imagen (images)
   - **Rate Limits**: Respect API quotas, handle rate limit errors gracefully
   - **Error Handling**: Network failures, invalid API keys, content policy violations

### Third-Party Libraries
- **@google/genai**: Official Google Generative AI SDK
  - Types exported: `Chat`, `Modality`, `Type`, etc.
  - Methods: `generateContent()`, `generateImages()`, `sendMessageStream()`
- **react**: UI library with hooks (useState, useCallback, useEffect, useRef)
- **react-dom**: DOM rendering

### Browser APIs Used
- **Audio API**: Web Audio API for TTS playback (`AudioContext`, `AudioBuffer`)
- **FileReader API**: For image upload and base64 conversion
- **Fetch API**: Implicitly used by @google/genai SDK

## Project-Specific Domain Knowledge

### Event Management Architecture Context
The application visualizes a comprehensive event management platform ("MaxTech") with these key components:

1. **Datenbanken (Databases)**
   - Hybrid approach: PostgreSQL (relational), MongoDB (documents), InfluxDB (time-series), Redis (cache)
   - CQRS and Event Sourcing patterns
   - IoT sensor data integration

2. **Schnittstellen & API (Interfaces & API)**
   - Multi-API strategy: GraphQL (primary), REST, WebSockets
   - JWT authentication, RBAC authorization
   - External integrations: ERP (OData, SAP-IDoc), LMS (xAPI)

3. **Dashboards & Benutzeroberfläche (Dashboards & UI)**
   - Progressive Web App with offline capability
   - Role-based dashboards (technicians, managers, trainees, admins)
   - Widget system with drag-and-drop customization
   - WCAG 2.1 AA accessibility compliance

4. **Visualisierungen (Visualizations)**
   - 3D/AR warehouse visualization
   - Digital Twin technology (Unity/WebGL/Three.js)
   - Project timelines (Gantt charts, Kanban boards)
   - CAD integration (Vectorworks, Blender)

5. **Externe Systeme & Infrastruktur (External Systems & Infrastructure)**
   - Cloud-based infrastructure (AWS/Azure/GCP)
   - Container orchestration (Docker, Kubernetes)
   - CI/CD pipeline (GitHub Actions)
   - Specialized applications: Public events site, warehouse app, freelancer portal

### Development Phases (Blueprint)
1. **Phase 1 (Q1)**: Foundation & prototyping - Infrastructure, data models, API POC
2. **Phase 2 (Q2-Q3)**: MVP development - Auth, dashboard, inventory app, user testing
3. **Phase 3 (Q4)**: Feature expansion - Digital Twin, ERP integration, freelancer portal
4. **Phase 4 (Ongoing)**: Scaling & optimization - Monitoring, performance, security

### GraphQL API Examples
- Queries: `GetAllProjects`, `GetProjectDetails` (with materials and personnel)
- Mutations: `CreateProject` with input validation
- Domain entities: Projects, Materials, Personnel, Budget

## AI Agent Best Practices for This Codebase

### When Adding New Features
1. **Follow Component Patterns**: Study existing components for state management, error handling, and styling
2. **Type Everything**: Add TypeScript types for all new data structures
3. **Maintain Consistency**: Use existing naming conventions and file organization
4. **Consider Accessibility**: Include ARIA labels, keyboard navigation, focus states
5. **Handle Errors Gracefully**: User-friendly messages, console.error for debugging

### When Working with Gemini API
1. **Check API Key**: Ensure `process.env.API_KEY` is available before creating client
2. **Use Appropriate Models**: Flash for speed, Pro for depth, TTS for audio, Imagen for images
3. **Stream When Possible**: Better UX for long-running generation tasks
4. **Validate Responses**: Check for expected data structures before using
5. **Provide Context**: Include relevant domain information in prompts

### When Modifying UI
1. **Preserve Dark Theme**: Stick to slate-* color palette
2. **Maintain Responsiveness**: Test on mobile (especially md: and lg: breakpoints)
3. **Loading States**: Always show loading indicators during async operations
4. **Visual Feedback**: Hover states, disabled states, transition effects

### When Debugging
1. **Check Console**: Components log errors with `console.error()`
2. **Verify Environment**: Ensure `.env.local` has `GEMINI_API_KEY`
3. **Network Tab**: Monitor API calls to Gemini services
4. **Build Issues**: Check TypeScript compilation errors with `npm run build`

### Testing Recommendations
1. **Manual Testing**: No automated tests - thoroughly test changes in browser
2. **Cross-Browser**: Verify in Chrome, Firefox, Safari (especially Audio API)
3. **API Key Scenarios**: Test with invalid/missing API keys
4. **Error Scenarios**: Test network failures, API rate limits
5. **Responsive Design**: Test on mobile devices or browser dev tools

## Common Pitfalls & Solutions

### Issue: API Key Not Working
- **Solution**: Verify `.env.local` exists with correct key, restart dev server after changes
- **Check**: vite.config.ts injects as both `API_KEY` and `GEMINI_API_KEY`

### Issue: Build Fails
- **Solution**: Run `npm run build` to see TypeScript errors
- **Common Cause**: Missing type definitions, incorrect imports, unused variables

### Issue: Gemini API Errors
- **Solution**: Check network tab for API response, validate API key, check quotas
- **Common Errors**: Content policy violations (image generation), rate limits

### Issue: Audio Not Playing (TTS)
- **Solution**: User interaction required before AudioContext creation (browser policy)
- **Check**: Sample rate (24000), channel count (1), base64 decoding

### Issue: Component Not Rendering
- **Solution**: Check React DevTools, console for errors, verify imports
- **Common Cause**: Missing key props, incorrect parent-child relationships

## Special Considerations

### German Language Content
- Architecture descriptions and data are in German
- UI labels and buttons are in German ("Gemini Actions", "Zusammenfassen")
- Keep German text when modifying architecture data
- English is acceptable for code comments and new feature development

### Progressive Web App (PWA)
- Offline capability expected in future
- Consider service worker integration when adding features
- Responsive design is critical (mobile-first approach)

### Accessibility (A11y)
- ARIA labels required for icon-only buttons
- Keyboard navigation support (focus states, Enter key handlers)
- Color contrast ratios must meet WCAG 2.1 AA
- Screen reader friendly (semantic HTML, descriptive text)

### Performance Considerations
- Lazy load images and heavy components where possible
- Debounce user input for API calls
- Stream large responses instead of waiting for complete data
- Minimize re-renders with useCallback and memoization

### Security
- Never commit `.env.local` or API keys
- Sanitize user input before sending to Gemini
- Use `dangerouslySetInnerHTML` carefully (only for trusted AI-generated content)
- Validate all API responses before rendering

## Quick Reference

### Component Template
```typescript
import React, { useState } from 'react';
import type { /* YourTypes */ } from '../types';

interface YourComponentProps {
  // Define props
}

export const YourComponent: React.FC<YourComponentProps> = ({ /* props */ }) => {
  const [state, setState] = useState<Type>(initialValue);

  const handleAction = async () => {
    try {
      // Implementation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      {/* Content */}
    </div>
  );
};
```

### Gemini API Call Pattern
```typescript
import { getAiClient } from '../gemini';

const ai = getAiClient();
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Your prompt here',
});
const result = response.text;
```

### Adding Types
```typescript
// In types.ts
export interface YourInterface {
  field: string;
  optionalField?: number;
}

export type YourUnionType = 'option1' | 'option2' | 'option3';
```

## Contact & Resources

- **Repository**: https://github.com/saitentrompete/Service_Tech
- **Gemini API Docs**: https://ai.google.dev/docs
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

## Version Information

- **Last Updated**: 2025-11-04
- **Project Version**: 0.0.0
- **Node Version Required**: 18+ (for Vite 6.x)
- **React Version**: 19.2.0
- **TypeScript Version**: 5.8.2

---

*This document is designed to provide AI coding agents with comprehensive context for working efficiently and effectively within this codebase. Always prioritize code quality, maintainability, and consistency with existing patterns.*
