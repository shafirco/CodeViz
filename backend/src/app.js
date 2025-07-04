const express = require('express');
const cors = require('cors');
const llmAnalysisRoutes = require('./routes/llmAnalysisRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', llmAnalysisRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 