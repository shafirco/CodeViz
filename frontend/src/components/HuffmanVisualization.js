'use client';

import { useState, useEffect } from 'react';
import FrequencyChart from './huffman/FrequencyChart';
import TreeVisualization from './huffman/TreeVisualization';
import TreeBuildingVisualization from './huffman/TreeBuildingVisualization';
import MergeProcess from './huffman/MergeProcess';
import CodeTable from './huffman/CodeTable';
import EncodingResult from './huffman/EncodingResult';

export default function HuffmanVisualization({ steps, inputString }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(1500); // milliseconds

    // Auto-play functionality
    useEffect(() => {
        let interval;
        if (isPlaying && currentStepIndex < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStepIndex(prev => prev + 1);
            }, playSpeed);
        } else if (isPlaying && currentStepIndex >= steps.length - 1) {
            setIsPlaying(false);
        }

        return () => clearInterval(interval);
    }, [isPlaying, currentStepIndex, playSpeed, steps.length]);

    const currentStep = steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    const handlePlay = () => setIsPlaying(!isPlaying);
    const handleReset = () => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };
    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };
    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const renderStepVisualization = () => {
        if (!currentStep) return <div>No step data available</div>;

        switch (currentStep.type) {
            case 'frequency':
                return <FrequencyChart data={currentStep.data} inputString={inputString} />;
            
            case 'leaf_creation':
                return (
                    <div className="text-center">
                        <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                            Leaf Node Creation
                        </h4>
                        <div className="flex flex-wrap justify-center gap-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
                            {currentStep.data.map((node, index) => (
                                <div key={node.id} className="flex flex-col items-center p-3 bg-white rounded-lg border shadow-sm">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                                        {node.char}
                                    </div>
                                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                        Freq: {node.freq}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Each character becomes a leaf node with its frequency count.
                        </p>
                    </div>
                );
            
            case 'initial_sort':
                return (
                    <div className="text-center">
                        <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                            Initial Sorting
                        </h4>
                        <div className="flex flex-wrap justify-center gap-3 p-6 bg-purple-50 rounded-lg border border-purple-200">
                            {currentStep.data.sortedNodes.map((node, index) => (
                                <div key={node.id} className="flex flex-col items-center p-3 bg-white rounded-lg border shadow-sm">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">
                                        {node.char}
                                    </div>
                                    <div className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                        {node.freq}
                                    </div>
                                    <div className="text-xs text-gray-400">#{index + 1}</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {currentStep.data.explanation}
                        </p>
                    </div>
                );
            
            case 'pre_merge':
            case 'merge_complete':
            case 'tree_complete':
                return <TreeBuildingVisualization step={currentStep} data={currentStep.data} />;
            
            case 'code_generation':
                return <CodeTable codes={currentStep.data.codes} codeGeneration={currentStep.data.codeGeneration} />;
            
            case 'encoding_complete':
                return <EncodingResult data={currentStep.data} inputString={inputString} />;
            
            default:
                // Fallback for old step structure
                switch (currentStep.step) {
                    case 1:
                        return <FrequencyChart data={currentStep.data} inputString={inputString} />;
                    case 2:
                        return <TreeVisualization tree={currentStep.data[0]} />;
                    case 3:
                        return <MergeProcess data={currentStep.data} />;
                    case 4:
                        return <CodeTable codes={currentStep.data} />;
                    case 5:
                        return <EncodingResult data={currentStep.data} inputString={inputString} />;
                    default:
                        return (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">❓</div>
                                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                    Unknown Step Type
                                </h4>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Type: {currentStep.type || 'Unknown'}, Step: {currentStep.step}
                                </p>
                                <pre className="mt-4 text-xs bg-gray-100 p-2 rounded">
                                    {JSON.stringify(currentStep, null, 2)}
                                </pre>
                            </div>
                        );
                }
        }
    };

    return (
        <div className="w-full">
            {/* Progress and Controls */}
            <div className="mb-6 p-6 border rounded-lg" style={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-default)'
            }}>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            Step {currentStep.step}: {currentStep.description}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {currentStepIndex + 1} of {steps.length} steps
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Speed:</span>
                        <select
                            value={playSpeed}
                            onChange={(e) => setPlaySpeed(Number(e.target.value))}
                            className="text-xs p-2 border rounded"
                            style={{ 
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border-default)',
                                color: 'var(--color-text-primary)'
                            }}
                        >
                            <option value={2500}>Slow</option>
                            <option value={1500}>Normal</option>
                            <option value={800}>Fast</option>
                            <option value={400}>Very Fast</option>
                        </select>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                                width: `${progress}%`,
                                backgroundColor: 'var(--color-primary-500)'
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        <span>Start</span>
                        <span>{Math.round(progress)}% Complete</span>
                        <span>Finish</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStepIndex === 0}
                        className="px-4 py-2 rounded border transition-all"
                        style={{
                            backgroundColor: currentStepIndex === 0 ? 'var(--color-neutral-100)' : 'var(--color-surface)',
                            borderColor: 'var(--color-border-default)',
                            color: currentStepIndex === 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                            cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ⏮ Previous
                    </button>
                    
                    <button
                        onClick={handlePlay}
                        disabled={currentStepIndex >= steps.length - 1}
                        className="px-6 py-2 rounded font-medium text-white transition-all"
                        style={{
                            backgroundColor: currentStepIndex >= steps.length - 1 
                                ? 'var(--color-neutral-400)' 
                                : isPlaying ? 'var(--color-warning-500)' : 'var(--color-primary-500)',
                            cursor: currentStepIndex >= steps.length - 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                    
                    <button
                        onClick={handleNext}
                        disabled={currentStepIndex >= steps.length - 1}
                        className="px-4 py-2 rounded border transition-all"
                        style={{
                            backgroundColor: currentStepIndex >= steps.length - 1 ? 'var(--color-neutral-100)' : 'var(--color-surface)',
                            borderColor: 'var(--color-border-default)',
                            color: currentStepIndex >= steps.length - 1 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                            cursor: currentStepIndex >= steps.length - 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next ⏭
                    </button>
                    
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded border transition-all ml-2"
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border-default)',
                            color: 'var(--color-text-primary)'
                        }}
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Step Visualization */}
            <div className="border rounded-lg p-6" style={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-default)',
                minHeight: '400px'
            }}>
                {renderStepVisualization()}
            </div>

            {/* Step Navigation Pills */}
            <div className="mt-6 mb-8 flex justify-center gap-2 pb-4">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentStepIndex(index)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                        style={{
                            backgroundColor: index === currentStepIndex 
                                ? 'var(--color-primary-500)' 
                                : 'var(--color-neutral-200)',
                            color: index === currentStepIndex 
                                ? 'white' 
                                : 'var(--color-text-secondary)',
                            border: 'none',
                            cursor: 'pointer',
                            minWidth: '40px',
                            height: '40px'
                        }}
                        title={`Step ${step.step}: ${step.description}`}
                    >
                        {step.step}
                    </button>
                ))}
            </div>
        </div>
    );
} 