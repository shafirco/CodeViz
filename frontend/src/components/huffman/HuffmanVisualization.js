'use client';

import { useState, useEffect } from 'react';
import { analyzeHuffman } from '../../api/axios';
import HuffmanVisualizationMain from '../HuffmanVisualization';
import LoadingAnimationSpectacular from '../ui/LoadingAnimationSpectacular';

export default function HuffmanVisualization({ input }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHuffmanSteps = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await analyzeHuffman(input || 'hello world');
                setSteps(result.steps || []);
            } catch (err) {
                console.error('Error fetching Huffman steps:', err);
                setError(err.message || 'Failed to analyze Huffman encoding');
            } finally {
                setLoading(false);
            }
        };

        fetchHuffmanSteps();
    }, [input]);

    if (loading) {
        return (
            <LoadingAnimationSpectacular 
                type="ai" 
                message={`⚡ Analyzing Huffman encoding for "${input || 'hello world'}"`} 
            />
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Error Loading Visualization
                </h5>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded border"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-default)',
                        color: 'var(--color-text-primary)'
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!steps || steps.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h5 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    No Steps Available
                </h5>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Unable to generate visualization steps for the input.
                </p>
            </div>
        );
    }

    return (
        <HuffmanVisualizationMain 
            steps={steps} 
            inputString={input || 'hello world'} 
        />
    );
}
