'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component to visualize the final tree structure
const FinalTreeVisualization = ({ tree }) => {
    const renderTreeNode = (node, x = 600, y = 70, level = 0) => {
        if (!node) return null;

        const horizontalSpacing = Math.max(90, 280 / Math.pow(1.4, level));
        const levelHeight = 100;

        return (
            <g key={node.id || `${x}-${y}`}>
                {/* Edges to children */}
                {node.left && (
                    <motion.line
                        x1={x}
                        y1={y}
                        x2={x - horizontalSpacing}
                        y2={y + levelHeight}
                        stroke="url(#edgeGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: level * 0.2 }}
                    />
                )}
                {node.right && (
                    <motion.line
                        x1={x}
                        y1={y}
                        x2={x + horizontalSpacing}
                        y2={y + levelHeight}
                        stroke="url(#edgeGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: level * 0.2 }}
                    />
                )}

                {/* Node background glow */}
                <motion.circle
                    cx={x}
                    cy={y}
                    r="26"
                    fill={node.isLeaf ? "rgba(59, 130, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: level * 0.15 }}
                />

                {/* Current node with gradient */}
                <motion.circle
                    cx={x}
                    cy={y}
                    r="22"
                    fill={node.isLeaf ? "url(#leafGradient)" : "url(#internalGradient)"}
                    stroke="white"
                    strokeWidth="3"
                    filter="url(#shadow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: level * 0.2, type: "spring", stiffness: 260, damping: 20 }}
                />
                
                {/* Node label */}
                <motion.text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dy="0.35em"
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: level * 0.2 + 0.2 }}
                >
                    {node.char || node.freq}
                </motion.text>

                {/* Frequency label below node */}
                <motion.text
                    x={x}
                    y={y + 40}
                    textAnchor="middle"
                    fill="#4b5563"
                    fontSize="11"
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: level * 0.2 + 0.3 }}
                >
                    {node.char ? `'${node.char}': ${node.freq}` : `Freq: ${node.freq}`}
                </motion.text>

                {/* Edge labels for binary codes */}
                {node.left && (
                    <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: level * 0.2 + 0.6 }}>
                        <circle
                            cx={x - horizontalSpacing / 2}
                            cy={y + levelHeight / 2}
                            r="12"
                            fill="#ef4444"
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={x - horizontalSpacing / 2}
                            y={y + levelHeight / 2}
                            textAnchor="middle"
                            dy="0.35em"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                        >
                            0
                        </text>
                    </motion.g>
                )}
                {node.right && (
                    <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: level * 0.2 + 0.6 }}>
                        <circle
                            cx={x + horizontalSpacing / 2}
                            cy={y + levelHeight / 2}
                            r="12"
                            fill="#22c55e"
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={x + horizontalSpacing / 2}
                            y={y + levelHeight / 2}
                            textAnchor="middle"
                            dy="0.35em"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                        >
                            1
                        </text>
                    </motion.g>
                )}

                {/* Recursively render children */}
                {node.left && renderTreeNode(node.left, x - horizontalSpacing, y + levelHeight, level + 1)}
                {node.right && renderTreeNode(node.right, x + horizontalSpacing, y + levelHeight, level + 1)}
            </g>
        );
    };

    return (
        <div className="w-full overflow-x-auto p-6">
            <svg width="1200" height="450" viewBox="0 0 1200 450" className="w-full min-w-[900px]">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.3"/>
                    </pattern>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
                    </filter>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#60a5fa", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="internalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#a78bfa", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#6b7280", stopOpacity:0.8}} />
                        <stop offset="100%" style={{stopColor:"#4b5563", stopOpacity:1}} />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {renderTreeNode(tree)}
            </svg>
            
            <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span>Leaf Nodes (Characters)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span>Internal Nodes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">0</span>
                        <span>Left Edge</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500 font-bold">1</span>
                        <span>Right Edge</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component to show current tree state during merges
const CurrentTreeState = ({ step }) => {
    if (!step.data.treeStructure) return null;

    return (
        <div className="mt-6">
            <h5 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Current Tree State
            </h5>
            <div className="p-4 bg-gray-50 rounded-lg border">
                <FinalTreeVisualization tree={step.data.treeStructure} />
            </div>
        </div>
    );
};

export default function TreeBuildingVisualization({ step, data }) {
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [animationPhase, setAnimationPhase] = useState('initial');

    useEffect(() => {
        if (step.type === 'pre_merge') {
            setHighlightedNodes(step.data.selectedNodes?.map(n => n.id) || []);
            setAnimationPhase('selection');
        } else if (step.type === 'merge_complete') {
            setAnimationPhase('merge');
            // Highlight the new node after a delay
            const timer = setTimeout(() => {
                setHighlightedNodes([step.data.newNode?.id]);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const renderNode = (node, index, isHighlighted = false, isNew = false) => {
        const baseClasses = "inline-flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-bold transition-all duration-300";
        
        let colorClasses = "";
        let borderClasses = "";
        
        if (isNew) {
            colorClasses = "bg-gradient-to-r from-green-400 to-green-600 text-white";
            borderClasses = "border-green-300 shadow-lg";
        } else if (isHighlighted) {
            colorClasses = "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
            borderClasses = "border-yellow-300 shadow-lg";
        } else if (node.isLeaf) {
            colorClasses = "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
            borderClasses = "border-blue-300";
        } else {
            colorClasses = "bg-gradient-to-r from-purple-400 to-purple-600 text-white";
            borderClasses = "border-purple-300";
        }

        return (
            <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: isHighlighted || isNew ? 1.1 : 1, 
                    opacity: 1,
                    y: isNew ? [20, 0] : 0
                }}
                transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="relative flex flex-col items-center"
            >
                {/* Node circle */}
                <div className={`${baseClasses} ${colorClasses} ${borderClasses}`}>
                    {node.char || '●'}
                </div>
                
                {/* Frequency label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mt-1 text-xs font-medium px-2 py-1 bg-gray-100 rounded-full"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {node.freq}
                </motion.div>

                {/* Node ID for debugging */}
                <div className="mt-1 text-xs opacity-50" style={{ color: 'var(--color-text-tertiary)' }}>
                    {node.id}
                </div>
            </motion.div>
        );
    };

    const renderQueue = (nodes, title, highlightIds = []) => {
        if (!nodes || nodes.length === 0) return null;

        return (
            <div className="mb-6">
                <h5 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {title}
                </h5>
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    {nodes.map((node, index) => renderNode(
                        node, 
                        index, 
                        highlightIds.includes(node.id),
                        false
                    ))}
                </div>
            </div>
        );
    };

    const renderMergeVisualization = () => {
        if (step.type !== 'merge_complete') return null;

        const { mergedNodes, newNode } = step.data;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <h5 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Merge Operation
                </h5>
                
                <div className="flex items-center justify-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    {/* Left node */}
                    <div className="flex flex-col items-center">
                        <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                            Left Child
                        </div>
                        {renderNode(mergedNodes.left, 0, false, false)}
                    </div>

                    {/* Merge arrow */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="flex items-center"
                    >
                        <div className="text-2xl" style={{ color: 'var(--color-primary-500)' }}>
                            +
                        </div>
                    </motion.div>

                    {/* Right node */}
                    <div className="flex flex-col items-center">
                        <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                            Right Child
                        </div>
                        {renderNode(mergedNodes.right, 1, false, false)}
                    </div>

                    {/* Result arrow */}
                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-2xl" 
                        style={{ color: 'var(--color-primary-500)' }}
                    >
                        →
                    </motion.div>

                    {/* New node */}
                    <div className="flex flex-col items-center">
                        <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                            New Internal Node
                        </div>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            {renderNode({
                                id: newNode.id,
                                char: null,
                                freq: newNode.freq,
                                isLeaf: false
                            }, 2, false, true)}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderStepExplanation = () => {
        let explanation = "";
        let stepIcon = "📋";

        switch (step.type) {
            case 'pre_merge':
                explanation = `We select the two nodes with the smallest frequencies (${step.data.selectedNodes?.[0]?.freq} and ${step.data.selectedNodes?.[1]?.freq}) to merge next.`;
                stepIcon = "🎯";
                break;
            case 'merge_complete':
                explanation = `Created a new internal node with frequency ${step.data.newNode?.freq} by combining the two selected nodes.`;
                stepIcon = "🔀";
                break;
            case 'tree_complete':
                explanation = "The Huffman tree is now complete! All characters have been organized into an optimal binary tree.";
                stepIcon = "✅";
                break;
            default:
                explanation = step.description;
        }

        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded"
            >
                <div className="flex items-start gap-3">
                    <span className="text-2xl">{stepIcon}</span>
                    <div>
                        <h4 className="font-semibold text-blue-800 mb-1">
                            Step {step.step}: {step.description}
                        </h4>
                        <p className="text-sm text-blue-700">
                            {explanation}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="w-full">
            {renderStepExplanation()}

            {step.type === 'pre_merge' && (
                <>
                    {renderQueue(
                        step.data.currentQueue, 
                        "Current Priority Queue (sorted by frequency)", 
                        step.data.selectedNodes?.map(n => n.id)
                    )}
                    
                    {/* Show current forest of mini-trees */}
                    <div className="mt-6">
                        <h5 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                            Current Forest (Individual Trees)
                        </h5>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex flex-wrap justify-center gap-6">
                                {step.data.currentQueue.map((node, index) => (
                                    <div key={node.id} className={`flex flex-col items-center p-3 bg-white rounded-lg border shadow-sm ${step.data.selectedNodes?.some(selected => selected.id === node.id) ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 ${node.isLeaf ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' : 'bg-gradient-to-r from-purple-400 to-purple-600 text-white'}`}>
                                            {node.char || '●'}
                                        </div>
                                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                            Freq: {node.freq}
                                        </div>
                                        {step.data.selectedNodes?.some(selected => selected.id === node.id) && (
                                            <div className="text-xs text-yellow-600 font-bold mt-1">
                                                SELECTED
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            🔍 <strong>Next:</strong> These two highlighted nodes will be merged into a single internal node.
                        </p>
                    </motion.div>
                </>
            )}

            {step.type === 'merge_complete' && (
                <>
                    {renderMergeVisualization()}
                    {step.data.updatedQueue?.length > 0 && renderQueue(
                        step.data.updatedQueue, 
                        "Updated Priority Queue",
                        [step.data.newNode?.id]
                    )}
                    <CurrentTreeState step={step} />
                </>
            )}

            {step.type === 'tree_complete' && step.data.finalTree && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border"
                >
                    <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🌳</div>
                        <h4 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            Complete Huffman Tree
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            The tree construction is complete. Each character now has an optimal binary code.
                        </p>
                    </div>
                    
                    {/* Actual Tree Visualization */}
                    <FinalTreeVisualization tree={step.data.finalTree} />
                </motion.div>
            )}
        </div>
    );
}; 