# CodeViz Backend - AI Algorithm Analysis API

A powerful Node.js backend service that provides AI-powered code analysis and algorithm visualization data. The backend serves as the intelligence layer for CodeViz, analyzing algorithms, generating step-by-step execution data, and providing educational insights.

## 🚀 Features

- **🌳 Huffman Encoding Engine** - Complete implementation with step-by-step visualization data
- **🤖 AI Code Analysis** - OpenAI GPT-powered algorithm analysis and explanation
- **📊 Step Generation** - Detailed algorithm execution steps for visualization
- **🔍 Algorithm Detection** - Automatic algorithm type and complexity identification
- **📚 Example Management** - Curated algorithm examples with analysis
- **⚡ RESTful API** - Clean, documented endpoints for frontend integration
- **🛡️ Schema Validation** - Consistent response formatting and validation

## 🛠️ Tech Stack

- **Runtime**: Node.js 
- **Framework**: Express.js
- **AI Integration**: OpenAI API (GPT-4)
- **Validation**: Custom schema validation
- **Cross-Origin**: CORS support
- **Environment**: dotenv configuration
- **Development**: Nodemon for hot reload

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers and business logic
│   │   └── algorithms.js     # Algorithm analysis controllers
│   ├── routes/              # API route definitions
│   │   ├── algorithms.js     # Algorithm endpoints (/api/algorithms/*)
│   │   ├── exampleRoutes.js  # Example management
│   │   └── llmAnalysisRoutes.js # AI analysis endpoints
│   ├── services/            # Core business services
│   │   ├── examples/
│   │   │   └── exampleManager.js # Example CRUD operations
│   │   └── llm/            # LLM integration services
│   │       ├── analyzers/
│   │       │   └── codeAnalyzer.js # AI code analysis
│   │       ├── factory.js          # LLM provider factory
│   │       └── providers/          # LLM service providers
│   │           ├── base.js         # Abstract base provider
│   │           └── openai.js       # OpenAI implementation
│   ├── schemas/             # Validation schemas
│   │   ├── analysisSchema.json   # Analysis response schema
│   │   └── validateSchema.js     # Schema validation utilities
│   └── server.js           # Application entry point and configuration
├── package.json            # Dependencies and scripts
└── README.md              # This documentation
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API key** (for AI analysis features)

### Quick Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3001
   ```

4. **Start the server:**
   ```bash
   # Development with hot reload
   npm run dev
   
   # Or production mode
   npm start
   ```

Server runs on `http://localhost:3000`

## 📚 API Documentation

### Huffman Encoding

#### `POST /api/algorithms/hoffman`
Analyzes text and generates Huffman encoding steps for visualization.

**Request:**
```json
{
  "hoffmanCode": "hello world"
}
```

**Response:**
```json
{
  "success": true,
  "steps": [
    {
      "step": 1,
      "description": "Calculate character frequencies",
      "data": {
        "h": 1, "e": 1, "l": 3, "o": 2, " ": 1, "w": 1, "r": 1, "d": 1
      }
    },
    {
      "step": 2,
      "description": "Create initial leaf nodes",
      "data": [...]
    },
    // ... more steps
  ],
  "compressionStats": {
    "original": "hello world",
    "encoded": "110100001...",
    "originalBits": 88,
    "compressedBits": 32,
    "compressionRatio": 0.36
  }
}
```

### AI Code Analysis

#### `POST /api/analyze`
Analyzes algorithm code using AI and provides educational insights.

**Request:**
```json
{
  "code": "function binarySearch(arr, target) { ... }"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "algorithm": {
      "algorithmType": "Binary Search",
      "category": "Searching Algorithm",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "explanation": "Binary search efficiently finds elements...",
      "metaphor": "Like finding a word in a dictionary..."
    },
    "bestUseCase": "Searching in large sorted datasets",
    "worstCase": "Target not found or at extremes"
  }
}
```

### Example Management

#### `GET /api/examples`
Retrieves all saved algorithm examples.

**Response:**
```json
{
  "success": true,
  "examples": [
    {
      "id": "binary-search",
      "title": "Binary Search",
      "category": "Searching",
      "code": "...",
      "analysis": { ... }
    }
  ]
}
```

#### `GET /api/examples/:id`
Get specific example by ID.

## 🔧 Core Components

### Huffman Algorithm Engine (`controllers/algorithms.js`)

**Key Functions:**
- `analyzeHoffman(req, res)` - Main endpoint handler
- `getHoffmanExecuteSteps(hoffmanCode)` - Step generation engine
- Frequency calculation
- Tree building with merge visualization
- Code generation and encoding

**Step Types Generated:**
1. **Frequency Analysis** - Character frequency calculation
2. **Tree Initialization** - Initial leaf node creation  
3. **Tree Building** - Step-by-step Huffman tree construction
4. **Code Generation** - Binary code assignment
5. **Text Encoding** - Final compression with statistics

### AI Analysis Service (`services/llm/`)

**OpenAI Integration:**
- Structured prompts for algorithm analysis
- JSON schema-guided responses
- Error handling and retries
- Token usage optimization

**Analysis Capabilities:**
- Algorithm type detection
- Complexity analysis (time/space)
- Educational explanations
- Real-world metaphors
- Use case recommendations

### Schema Validation (`schemas/`)

**Validation Features:**
- Request/response validation
- Error message formatting
- Type checking and constraints
- Custom validation rules

## 🔌 Environment Configuration

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI analysis | `sk-...` | Yes |
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `FRONTEND_URL` | CORS origin URL | `http://localhost:3001` | No |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging verbosity | `info` |
| `TIMEOUT_MS` | Request timeout | `30000` |
| `RATE_LIMIT` | Requests per minute | `100` |

## 🏗️ Architecture Patterns

### Service Layer Architecture
```
Routes → Controllers → Services → External APIs
  ↓         ↓           ↓           ↓
Request → Business → Core Logic → OpenAI/etc
Handling   Logic      & Data
```

### Error Handling Strategy
- Centralized error middleware
- Structured error responses
- Request timeout protection
- Graceful API failure handling

### LLM Provider Pattern
```javascript
// Extensible AI provider system
const llmFactory = require('./services/llm/factory');
const analyzer = llmFactory.createAnalyzer('openai');

// Easy to add new providers
// analyzer = llmFactory.createAnalyzer('anthropic');
```

## 📈 Performance Considerations

### Optimization Features
- Request/response compression
- JSON schema validation caching
- Connection pooling for external APIs
- Timeout protection for long-running requests

### Monitoring
- Request logging with timing
- Error rate tracking
- API usage metrics
- Performance bottleneck identification

## 🐛 Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Verify dependencies
npm install

# Check environment
cat .env  # Ensure OPENAI_API_KEY is set
```

**OpenAI API errors:**
```bash
# Test API key
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models

# Check account credits and limits
```

**CORS issues:**
- Verify `FRONTEND_URL` in `.env`
- Check frontend is running on expected port
- Review browser console for specific CORS errors

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm run dev

# Check server logs
tail -f server.log
```

## 🔄 Development Workflow

### Adding New Algorithms
1. Create controller function in `controllers/algorithms.js`
2. Add route in `routes/algorithms.js`
3. Implement step generation logic
4. Add validation schema if needed
5. Test with frontend integration

### Extending AI Analysis
1. Update prompts in `services/llm/analyzers/codeAnalyzer.js`
2. Modify response schema in `schemas/analysisSchema.json`
3. Add new analysis capabilities
4. Update validation logic

## 🤝 Contributing

### Development Guidelines
- Follow existing code patterns and structure
- Add proper error handling for all endpoints
- Include schema validation for new endpoints
- Write meaningful commit messages
- Test API endpoints thoroughly

### Testing
```bash
# Run tests (when implemented)
npm test

# Manual API testing
curl -X POST http://localhost:3000/api/algorithms/hoffman \
     -H "Content-Type: application/json" \
     -d '{"hoffmanCode": "test"}'
```

## 📄 License

MIT License - see the main project LICENSE file for details.

## 🚀 Production Deployment

### Build Process
```bash
# Production build
npm run build

# Production start
npm start
```

### Environment Checklist
- [ ] OpenAI API key configured
- [ ] Environment variables set
- [ ] CORS origins configured
- [ ] Logging enabled
- [ ] Health check endpoint working 