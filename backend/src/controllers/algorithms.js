const analyzeHoffman = async (req, res) => {
    const { hoffmanCode } = req.body;
    const steps = getHoffmanExecuteSteps(hoffmanCode);
    res.json(steps);
};

const getHoffmanExecuteSteps = (hoffmanCode) => {
    const steps = [];
    let stepNumber = 1;
    
    // Step 1: Count character frequencies
    const frequencyMap = new Map();
    for (const char of hoffmanCode) {
        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
    steps.push({
        step: stepNumber++,
        description: "Calculate character frequencies from input text",
        data: Object.fromEntries(frequencyMap),
        type: "frequency"
    });

    // Step 2: Create initial leaf nodes
    const nodes = Array.from(frequencyMap.entries()).map(([char, freq], index) => ({
        id: `leaf_${index}`,
        char,
        freq,
        left: null,
        right: null,
        isLeaf: true
    }));
    
    steps.push({
        step: stepNumber++,
        description: "Create leaf nodes for each character",
        data: nodes.map(node => ({
            id: node.id,
            char: node.char,
            freq: node.freq,
            isLeaf: true
        })),
        type: "leaf_creation"
    });

    // Step 3: Sort initial nodes by frequency
    nodes.sort((a, b) => a.freq - b.freq);
    steps.push({
        step: stepNumber++,
        description: "Sort nodes by frequency (ascending order)",
        data: {
            sortedNodes: nodes.map(node => ({
                id: node.id,
                char: node.char,
                freq: node.freq,
                isLeaf: true
            })),
            explanation: "Always merge the two nodes with lowest frequencies first"
        },
        type: "initial_sort"
    });

    // Step 4: Build Huffman tree with detailed merge steps
    let mergeCount = 0;
    const allNodes = [...nodes]; // Keep track of all nodes for tree visualization
    
    while (nodes.length > 1) {
        // Show current state before merge
        nodes.sort((a, b) => a.freq - b.freq);
        
        steps.push({
            step: stepNumber++,
            description: `Merge step ${mergeCount + 1}: Select two nodes with lowest frequencies`,
            data: {
                currentQueue: nodes.map(node => ({
                    id: node.id,
                    char: node.char,
                    freq: node.freq,
                    isLeaf: node.isLeaf || false
                })),
                selectedNodes: [
                    { id: nodes[0].id, char: nodes[0].char, freq: nodes[0].freq },
                    { id: nodes[1].id, char: nodes[1].char, freq: nodes[1].freq }
                ]
            },
            type: "pre_merge"
        });

        // Perform the merge
        const left = nodes.shift();
        const right = nodes.shift();
        const newNodeId = `internal_${mergeCount}`;
        const parent = {
            id: newNodeId,
            char: null,
            freq: left.freq + right.freq,
            left,
            right,
            isLeaf: false
        };
        
        nodes.push(parent);
        allNodes.push(parent);
        mergeCount++;

        // Show merge result
        steps.push({
            step: stepNumber++,
            description: `Create new internal node by merging`,
            data: {
                mergedNodes: {
                    left: { id: left.id, char: left.char, freq: left.freq },
                    right: { id: right.id, char: right.char, freq: right.freq }
                },
                newNode: {
                    id: parent.id,
                    freq: parent.freq,
                    isInternal: true
                },
                updatedQueue: nodes.map(node => ({
                    id: node.id,
                    char: node.char,
                    freq: node.freq,
                    isLeaf: node.isLeaf || false
                })),
                treeStructure: buildTreeStructure(parent)
            },
            type: "merge_complete"
        });
    }

    // Step: Final tree structure
    const rootNode = nodes[0];
    steps.push({
        step: stepNumber++,
        description: "Huffman tree construction complete",
        data: {
            finalTree: buildTreeStructure(rootNode),
            explanation: "All nodes have been merged into a single binary tree"
        },
        type: "tree_complete"
    });

    // Step: Generate Huffman codes
    const codes = new Map();
    const codeGeneration = [];
    
    const generateCodes = (node, code = '', path = []) => {
        if (!node) return;
        
        const currentPath = [...path, { nodeId: node.id, code }];
        
        if (!node.left && !node.right) {
            // Leaf node - assign code
            codes.set(node.char, code || '0'); // Handle single character case
            codeGeneration.push({
                char: node.char,
                code: code || '0',
                path: currentPath
            });
        } else {
            // Internal node - traverse children
            generateCodes(node.left, code + '0', currentPath);
            generateCodes(node.right, code + '1', currentPath);
        }
    };
    
    generateCodes(rootNode);
    
    steps.push({
        step: stepNumber++,
        description: "Generate binary codes by traversing tree paths",
        data: {
            codes: Object.fromEntries(codes),
            codeGeneration,
            explanation: "Left edges = '0', Right edges = '1'"
        },
        type: "code_generation"
    });

    // Step: Encode the input string
    const encoded = Array.from(hoffmanCode)
        .map(char => codes.get(char))
        .join('');
    
    const originalBits = hoffmanCode.length * 8; // ASCII uses 8 bits per character
    const compressedBits = encoded.length;
    const compressionRatio = compressedBits / originalBits;
    
    steps.push({
        step: stepNumber++,
        description: "Encode original text using generated codes",
        data: {
            original: hoffmanCode,
            encoded: encoded,
            characterEncoding: Array.from(hoffmanCode).map(char => ({
                char: char,
                code: codes.get(char)
            })),
            compressionStats: {
                originalBits,
                compressedBits,
                compressionRatio: Math.round(compressionRatio * 100) / 100,
                spaceSaved: Math.round((1 - compressionRatio) * 100)
            }
        },
        type: "encoding_complete"
    });

    return { steps };
};

// Helper function to build tree structure for visualization
const buildTreeStructure = (node) => {
    if (!node) return null;
    
    return {
        id: node.id,
        char: node.char,
        freq: node.freq,
        isLeaf: !node.left && !node.right,
        left: buildTreeStructure(node.left),
        right: buildTreeStructure(node.right)
    };
};

module.exports = {
    analyzeHoffman,
    getHoffmanExecuteSteps
};