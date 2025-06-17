# CodeViz - AI Algorithm Visualizer

An interactive web application for visualizing and understanding algorithms through AI-powered analysis. CodeViz makes complex algorithms accessible by breaking them down into step-by-step visualizations with clear explanations and interactive examples.

## 🚀 Features

- 🌳 **Huffman Encoding Visualization**: Interactive step-by-step visualization of Huffman encoding compression
- 🔍 **AI Code Analysis**: Automatic analysis of algorithm code with complexity insights
- 📖 **Pre-built Examples**: Curated collection of popular algorithms with interactive visualizations
- 🎮 **Interactive Controls**: Play, pause, step through, and adjust speed of visualizations  
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🤖 **AI-Powered Insights**: Intelligent algorithm explanations with real-world metaphors

## 📋 Available Algorithms

- **Huffman Encoding** - Text compression algorithm visualization
- **Binary Search** - Efficient searching in sorted arrays
- **Bubble Sort** - Simple comparison-based sorting
- **Fibonacci Sequence** - Dynamic programming approach
- **Quick Sort** - Divide-and-conquer sorting (coming soon)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with app directory
- **React 18** - UI library with modern hooks
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design System** - Consistent UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - AI-powered code analysis
- **Algorithm Engines** - Custom implementation for step generation

## 🏁 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API key** (for AI analysis features)

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd CodeViz
```

2. **Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm start
```

3. **Setup Frontend:**
```bash
cd ../frontend
npm install
npm run dev
```

4. **Open your browser:**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:3000`

### Environment Variables

**Backend (.env):**
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
FRONTEND_URL=http://localhost:3001
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
CodeViz/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory (layout, page)
│   │   ├── components/      # React components
│   │   │   ├── ui/          # Reusable UI components (Button, Card)
│   │   │   ├── huffman/     # Huffman-specific components
│   │   │   └── visualizations/ # Algorithm visualization components
│   │   ├── styles/          # CSS and design tokens
│   │   └── api/             # API client functions
│   ├── public/              # Static assets (favicon, etc.)
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── controllers/     # Business logic controllers
│   │   ├── services/        # LLM and algorithm services
│   │   └── server.js        # Server entry point
│   └── package.json         # Backend dependencies
├── schemas/                 # Shared validation schemas
└── README.md               # This file
```

## 🎯 Usage

### Huffman Encoding
1. Navigate to the Huffman Encoding tab
2. Enter your text in the input field
3. Click "Analyze & Visualize" 
4. Watch the step-by-step compression process
5. Use playback controls to adjust visualization speed

### Code Analysis
1. Go to the Code Analyzer tab
2. Paste your algorithm code
3. Get AI-powered analysis with:
   - Algorithm type identification
   - Time/space complexity analysis
   - Real-world metaphors and explanations
   - Best use cases and limitations

### Examples
1. Browse the Examples tab
2. Filter by category or difficulty
3. Click on any algorithm to see:
   - Interactive visualization
   - Detailed analysis
   - Source code
   - Performance characteristics

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes:** `git commit -m 'Add amazing feature'`
5. **Push to your branch:** `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and structure
- Add proper TypeScript types where applicable
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

**Common Issues:**

- **Backend not starting:** Check if OpenAI API key is set in `.env`
- **Frontend build errors:** Clear `.next` folder and reinstall dependencies
- **Visualization not working:** Ensure backend is running and accessible
- **API errors:** Check browser console and backend logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Powered by OpenAI for intelligent analysis
- Inspired by the need to make algorithms more accessible
- Community-driven with educational focus 
