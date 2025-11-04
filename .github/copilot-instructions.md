# GitHub Copilot Instructions for Service_Tech

## Project Overview

This is a **Software Architecture Dashboard** - an interactive web application built with React, TypeScript, and Vite that provides a comprehensive overview of a complex event management and technical service system. The application integrates Google's Generative AI (Gemini) to enhance documentation, visualization, and user interaction capabilities.

### Purpose
The dashboard serves as a central hub for managing all aspects of event technical services, including:
- Project and resource management
- Inventory tracking
- Personnel scheduling
- API documentation
- AI-powered assistance and image generation
- Development planning and visualization

## Tech Stack

### Core Technologies
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Integration**: Google Generative AI (`@google/generative-ai`)
- **Styling**: Tailwind CSS (utility-first CSS)
- **Language**: TypeScript 5.8.2

### Development Tools
- **Package Manager**: npm
- **Module System**: ES Modules (ESM)
- **TypeScript Config**: Bundler module resolution with React JSX

## Project Structure

```
/
├── components/           # React components
│   ├── ApiDocumentation.tsx
│   ├── ArchitectureCard.tsx
│   ├── Chatbot.tsx
│   ├── DevelopmentBlueprint.tsx
│   ├── GeminiActions.tsx
│   ├── GroundingSearch.tsx
│   ├── ImageGenerator.tsx
│   ├── ImageStudio.tsx
│   ├── Spinner.tsx
│   └── Tabs.tsx
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── constants.tsx        # Application constants and static data
├── gemini.ts            # Google Generative AI client setup
├── utils.ts             # Utility functions
├── apiDocumentationData.ts        # API example data
├── developmentBlueprintData.ts    # Development phase data
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── index.html           # HTML entry point
```

## Architecture and Patterns

### Component Organization
- **Tabs Component**: Main navigation using a tab-based interface
- **Feature Components**: Each major feature (API Docs, Image Gen, etc.) is a separate component
- **Shared Components**: Reusable components like Spinner, GeminiActions
- **Data Separation**: Static data is separated into dedicated files (e.g., `apiDocumentationData.ts`)

### Type System
The project uses TypeScript with strict type definitions in `types.ts`:

```typescript
// Key interfaces
- ArchitectureComponentDetail: Details for architecture components
- ArchitectureComponentKey: Union type for component keys
- ChatMessage: Structure for chatbot messages
- BlueprintPhase: Development phase structure
- ApiEndpoint: API documentation endpoint structure
```

### State Management
- Uses React's built-in state management (useState, useEffect)
- No external state management library (Redux, Zustand, etc.)
- Component-level state for most features

## Key Conventions

### Naming Conventions
- **Components**: PascalCase (e.g., `ArchitectureCard.tsx`)
- **Files**: camelCase for data/utils, PascalCase for components
- **Types**: PascalCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE for exports

### Code Style
- **Imports**: React components use named imports
- **JSX**: Use React 19's automatic JSX transform (no need to import React in every file)
- **TypeScript**: Use type annotations, avoid `any` type
- **Functional Components**: All components are functional (no class components)
- **Props**: Define explicit prop types using interfaces

### File Organization
- Keep related components together
- Separate data definitions from component logic
- Use barrel exports where appropriate
- Keep utility functions in dedicated files

## Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server on port 3000
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Setup
1. **API Key Required**: Set `GEMINI_API_KEY` in `.env.local` file
2. **Environment Variables**: Accessed via `process.env.API_KEY` (defined in vite.config.ts)
3. **Local Development**: Server runs on `http://localhost:3000`

### Development Server
- Vite dev server runs on port 3000
- Hot Module Replacement (HMR) enabled
- Server accessible on all network interfaces (0.0.0.0)

## Integration Points

### Google Generative AI (Gemini)
- **Client Setup**: `gemini.ts` exports `getAiClient()` function
- **API Key**: Injected via Vite's define feature as `process.env.API_KEY`
- **Usage Pattern**: Create client on-demand to avoid crashes if API key is missing
- **Features Used**:
  - Text generation (summarization, analysis)
  - Image generation from prompts
  - Image analysis and editing
  - Grounded search capabilities
  - Chat/conversational AI

### Path Aliases
- `@/` resolves to the project root directory
- Configured in both `tsconfig.json` and `vite.config.ts`

## Dependencies

### Production Dependencies
- `react` & `react-dom`: UI framework
- `@google/generative-ai`: **Correct package name** for Google's Generative AI SDK
  - **Note**: Package.json currently has wrong package name (`@google/genai`)
  - Should be `@google/generative-ai` (with "generative-" in the name)

### Development Dependencies
- `@vitejs/plugin-react`: Vite plugin for React with Fast Refresh
- `@types/node`: Node.js type definitions
- `typescript`: TypeScript compiler
- `vite`: Build tool and dev server

## Application Features

### 1. Architecture Overview
- Displays five main architectural components:
  - Databases (Datenbanken)
  - APIs & Interfaces (Schnittstellen & API)
  - Dashboards & UI (Dashboards & Benutzeroberfläche)
  - Visualizations (Visualisierungen)
  - External Systems (Externe Systeme & Infrastruktur)
- Each component expandable with detailed information
- AI-powered actions (summarize, analyze, read aloud)

### 2. Development Blueprint
- Phased development plan (4 phases)
- Timeline and task breakdowns
- Strategic planning visualization

### 3. API Documentation
- GraphQL query and mutation examples
- Live code examples with syntax highlighting
- Response examples
- Validation error demonstrations

### 4. Image Generation
- Text-to-image using Gemini AI
- Prompt-based image creation

### 5. Image Studio
- Upload and analyze images
- AI-powered image editing
- Image description generation

### 6. Grounded Search
- Search with contextual grounding
- AI-enhanced search results

### 7. Chatbot
- Floating chat interface
- Context-aware AI assistant
- Architecture-specific knowledge

## Common Tasks

### Adding a New Component
1. Create component file in `components/` directory
2. Define props interface if needed
3. Import and use in `App.tsx` or parent component
4. Add to tab navigation if it's a main feature

### Adding New Types
1. Add type definitions to `types.ts`
2. Export the type/interface
3. Import where needed using `import type { TypeName } from './types'`

### Working with Gemini AI
1. Import client: `import { getAiClient } from './gemini'`
2. Create client instance: `const genai = getAiClient()`
3. Get model: `const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })`
4. Use model methods: `model.generateContent()`, `model.startChat()`, etc.

### Styling Guidelines
- Use Tailwind utility classes
- Color scheme: Slate background (slate-900) with cyan/emerald accents
- Responsive design: Mobile-first approach with `md:` breakpoints
- Consistent spacing: Use Tailwind's spacing scale

## Testing and Quality

### Current State
- **No test suite currently implemented**
- **No linting configuration present**
- Manual testing via dev server

### Best Practices
- Test new features manually in dev mode
- Verify AI integrations with valid API key
- Check responsive behavior on different screen sizes
- Validate TypeScript compilation before commits

## Known Issues and Notes

### Dependency Issue
⚠️ **CRITICAL**: The package.json currently references `@google/genai@^0.20.0` which doesn't exist.
- **Correct package**: `@google/generative-ai`
- **Fix required**: Update package.json dependency name
- This prevents `npm install` from working

### API Key Management
- API keys should never be committed to the repository
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`

### Browser Compatibility
- Modern browsers required (ES2022 support)
- No legacy browser support needed

## German Language Context

The application is primarily in German (German language UI):
- Architecture descriptions are in German
- UI labels and titles are in German
- Comments and documentation may be bilingual
- When generating content, consider the German context

## Additional Resources

- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vite.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Google AI SDK**: https://ai.google.dev/gemini-api/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Tips for AI Agents

1. **Always check types**: This is a TypeScript project - maintain type safety
2. **Respect the architecture**: Follow the existing pattern of data separation
3. **UI consistency**: Match the existing dark theme and color scheme
4. **German content**: Keep German language elements intact
5. **API key safety**: Never hardcode or expose API keys
6. **Component isolation**: Keep components focused and single-purpose
7. **Performance**: Consider lazy loading for heavy features
8. **Error handling**: Add proper error boundaries and user feedback
9. **Accessibility**: Maintain semantic HTML and ARIA labels where needed
10. **Build before deploy**: Always run `npm run build` to check for errors

## Quick Start for New Contributors

```bash
# Clone and setup
git clone <repository-url>
cd Service_Tech

# Fix dependency issue first
# Edit package.json: change "@google/genai" to "@google/generative-ai"

# Install dependencies
npm install

# Setup environment
echo "GEMINI_API_KEY=your-api-key-here" > .env.local

# Start development
npm run dev

# Visit http://localhost:3000
```

---

**Last Updated**: 2025-11-04
**Maintained By**: Service_Tech Team
