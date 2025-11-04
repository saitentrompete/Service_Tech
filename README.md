<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Software Architecture Dashboard

This is an interactive dashboard that provides a comprehensive overview of a software architecture, enhanced with generative AI capabilities. The application allows users to explore different components of the architecture, generate API documentation, create development blueprints, and much more.

## Features

- **Architecture Overview**: A detailed view of the software architecture components.
- **Development Blueprint**: A high-level overview of the phased development plan.
- **API Documentation**: Live examples of GraphQL queries and mutations.
- **Image Generation**: Generate images from text prompts.
- **Image Studio**: Upload, analyze, and edit images.
- **Grounded Search**: Perform grounded searches with Gemini.
- **Chatbot**: An AI assistant to answer questions about the software architecture.

## Getting Started

### Prerequisites

- Node.js
- A Gemini API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd your-repository
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up your environment variables:**
   - Create a file named `.env.local` in the root of the project.
   - Add the following line to the file, replacing `YOUR_API_KEY` with your actual Gemini API key:
     ```
     GEMINI_API_KEY=YOUR_API_KEY
     ```
5. **Run the application:**
   ```bash
   npm run dev
   ```
The application should now be running on `http://localhost:3000`.

## Usage

- **Architecture Overview**: Click on the "Architecture Overview" tab to see the different components of the software architecture. You can expand each component to see more details and use the Gemini actions to summarize, analyze, or read the content aloud.
- **Development Blueprint**: Click on the "Development Blueprint" tab to see the phased development plan.
- **API Documentation**: Click on the "API Documentation" tab to see examples of GraphQL queries and mutations. You can also generate new examples using Gemini.
- **Image Generation**: Click on the "Image Generation" tab to generate images from text prompts.
- **Image Studio**: Click on the "Image Studio" tab to upload, analyze, and edit images.
- **Grounded Search**: Click on the "Grounded Search" tab to perform grounded searches with Gemini.
- **Chatbot**: Click on the chat icon in the bottom right corner to open the chatbot and ask questions about the software architecture.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
