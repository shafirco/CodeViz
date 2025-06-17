# CodeViz Frontend - Next.js Application

The frontend application for CodeViz, built with Next.js 14 and modern React patterns. Provides an interactive interface for algorithm visualization and AI-powered code analysis.

## ✨ Features

- 🌳 **Huffman Encoding Visualization** - Interactive step-by-step compression visualization
- 🔍 **AI Code Analysis** - Intelligent algorithm analysis with explanations
- 📖 **Example Gallery** - Pre-built algorithm demonstrations
- 🎮 **Interactive Controls** - Play, pause, step-through, and speed controls
- 🎨 **Modern Design System** - Consistent UI with beautiful animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Next.js 14** - React framework with app directory
- **React 18** - Modern React with hooks and context
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design Tokens** - Consistent theming system

## 📁 Project Structure

```
src/
├── app/                   # Next.js app directory
│   ├── layout.js         # Root layout with metadata
│   ├── page.js           # Main application page
│   └── globals.css       # Global styles and imports
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── Button.js    # Enhanced button component
│   │   └── Card.js      # Card container component
│   ├── huffman/         # Huffman-specific components
│   │   ├── HuffmanVisualization.js
│   │   ├── FrequencyChart.js
│   │   ├── TreeVisualization.js
│   │   ├── MergeProcess.js
│   │   ├── CodeTable.js
│   │   └── EncodingResult.js
│   ├── visualizations/  # Other algorithm visualizations
│   │   ├── BubbleSortVisualization.js
│   │   ├── BinarySearchVisualization.js
│   │   └── FibonacciVisualization.js
│   ├── CodeAnalyzer.js  # AI code analysis component
│   ├── Examples.js      # Algorithm examples browser
│   ├── Welcome.js       # Welcome/onboarding screen
│   └── HuffmanVisualization.js # Main Huffman component
├── styles/              # Styling system
│   ├── design-tokens.css # CSS custom properties
│   └── components.css   # Component-specific styles
├── api/                 # API client functions
│   └── axios.js         # Backend API communication
└── public/              # Static assets
    └── favicon.ico      # CodeViz favicon
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:3000" > .env.local
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
   Visit [http://localhost:3001](http://localhost:3001)

## 📜 Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Fix ESLint issues automatically

## 🧩 Key Components

### Main Application (`page.js`)
- Navigation between Huffman, Analysis, and Examples
- State management for current view
- Welcome screen handling
- Responsive header with branding

### UI Components (`components/ui/`)
- **Button** - Enhanced with gradients and better hover states
- **Card** - Improved with shadows and hover effects
- Consistent design system implementation

### Huffman Visualization (`components/huffman/`)
- **HuffmanVisualization** - Wrapper that fetches API data
- **FrequencyChart** - Character frequency visualization
- **TreeVisualization** - Huffman tree rendering
- **MergeProcess** - Step-by-step tree building
- **CodeTable** - Binary code mapping display
- **EncodingResult** - Final compression results

### Examples System (`Examples.js`)
- Pre-analyzed algorithm collection
- Interactive filtering and search
- Detailed algorithm information cards
- Live visualization integration

### Design System (`styles/`)
- CSS custom properties for theming
- Consistent color palette and spacing
- Typography scale and font loading
- Component-specific styling patterns

## 🎨 Design System

### Colors
- Primary: Blue gradient (#0084ff to #005bd3)
- Secondary: Purple gradient (#9333ea to #6b21a8) 
- Accent: Green gradient (#16a34a to #166534)
- Semantic: Error, warning, success, info variants
- Neutral: 50-900 scale for text and borders

### Typography
- Font: Inter (loaded via Next.js font optimization)
- Scale: xs (12px) to 6xl (60px)
- Weights: 100-800 with named constants

### Spacing
- Scale: 1px to 8rem (128px)
- Consistent margin and padding system
- Component-specific spacing tokens

## 🔌 API Integration

### Backend Communication (`api/axios.js`)
- Centralized API client configuration
- Error handling and retry logic
- Request/response interceptors
- Timeout configuration (30s for LLM calls)

### Available API Functions
- `analyzeHuffman(inputString)` - Get Huffman steps
- `analyzeCode(code)` - AI code analysis
- `getExamples()` - Fetch example algorithms
- `getVisualizationConfig(algorithmType)` - Get viz config

## 🎯 Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer named exports over default exports
- Follow ESLint configuration
- Use meaningful variable and function names

### Component Patterns
- Keep components focused and single-purpose
- Use compound component pattern for complex UI
- Implement proper prop validation
- Handle loading and error states

### Styling
- Use Tailwind utility classes primarily
- Custom CSS only when necessary
- Follow design token system
- Maintain responsive design principles

### Performance
- Optimize images and assets
- Use dynamic imports for large components
- Implement proper error boundaries
- Monitor bundle size and loading times

## 🐛 Troubleshooting

**Common Issues:**

- **Build errors:** Clear `.next` folder and reinstall dependencies
- **API connection:** Check backend is running on port 3000
- **Environment variables:** Ensure `.env.local` is properly configured
- **Styling issues:** Check Tailwind CSS compilation

**Debug Steps:**
1. Check browser console for errors
2. Verify backend connectivity
3. Check environment variable configuration
4. Review network tab for API call failures

## 🤝 Contributing

1. Follow the established component patterns
2. Maintain design system consistency
3. Add proper error handling
4. Test responsive behavior
5. Update documentation for new features

For detailed contribution guidelines, see the main project README.
