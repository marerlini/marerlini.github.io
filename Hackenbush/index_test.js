const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 615;
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});



let currentGraph = 0;
let selectedEdge = null;
let currentPlayer = 1;
let isComputerPlayer = true;
let currentDifficulty = 'easy';

let graph;

function getGraph(index, callback) {
    fetch("graphs.json")
        .then(response => response.json())
        .then(graphs => {
            const graph = graphs[index];
            callback(graph);
        });
}



function confirmDifficulty() {
    const difficultySelect = document.getElementById('difficulty');
    currentDifficulty = difficultySelect.value;
    document.getElementById('difficultyMenu').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

function returnToMenu() {
    document.getElementById('controls').style.display = 'none';
    document.getElementById('graphCanvas').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('difficultyMenu').style.display = 'block';
}

function loadGraph(index) {
// Використання:
    getGraph(0, data => console.log(data)); // Виведе 3-й граф

    selectedEdge = null;
    currentPlayer = 1;
    canvas.style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('controls').style.display = 'block';
    document.getElementById('turnIndicator').innerText = "Хід: Гравець";
    drawGraph();
}

function drawGroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 15);
    ctx.lineTo(canvas.width, canvas.height - 15);
    ctx.strokeStyle = '#322C2B';
    ctx.setLineDash([10, 5]);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawGraph() {
    // const graph = graphs[currentGraph];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGroundLine();
    graph.edges.forEach(edge => {
        const fromNode = graph.nodes[edge.from];
        const toNode = graph.nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = (edge === selectedEdge) ? '#DDA853' : edge.deleted ? 'gray' : '#322C2B';
        ctx.lineWidth = 5;
        ctx.stroke();
    });
    graph.nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.deleted ? 'gray' : '#322C2B';
        ctx.fill();
    });
}

canvas.addEventListener('click', (event) => {
    if (currentGraph === -1 || currentPlayer !== 1) return;

    // const graph = graphs[currentGraph];
    const { offsetX, offsetY } = event;
    selectedEdge = null;

    for (let i = 0; i < graph.edges.length; i++) {
        const edge = graph.edges[i];
        if (edge.deleted) continue;

        const fromNode = graph.nodes[edge.from];
        const toNode = graph.nodes[edge.to];

        if (isPointOnLine(offsetX, offsetY, fromNode, toNode)) {
            selectedEdge = edge;
            drawGraph();
            return;
        }
    }
});

function isPointOnLine(x, y, fromNode, toNode) {
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const distance1 = Math.sqrt((x - fromNode.x) ** 2 + (y - fromNode.y) ** 2);
    const distance2 = Math.sqrt((x - toNode.x) ** 2 + (y - toNode.y) ** 2);
    return Math.abs(distance - (distance1 + distance2)) < 5;
}

canvas.addEventListener('contextmenu', () => {
    // const graph = graphs[currentGraph];
    if (selectedEdge) {
        selectedEdge.deleted = true;
        selectedEdge = null;

        removeIsolatedNodes(graph);

        if (checkGameOver()) {
            alert("Користувач переміг");
            returnToMenu();
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById('turnIndicator').innerText = "Хід: Компʼютер";
    }

    drawGraph();

    if (currentPlayer === 2 && isComputerPlayer) {
        setTimeout(computerMove, 500);
    }
});

function checkGameOver() {
    // const graph = graphs[currentGraph];
    return graph.edges.every(edge => edge.deleted);
}

function removeIsolatedNodes(graph) {
    const connectedToGround = new Set();
    graph.nodes.forEach((node, index) => {
        if (node.isGround && !node.deleted) {
            connectedToGround.add(index);
        }
    });
    let added;
    do {
        added = false;
        graph.edges.forEach(edge => {
            if (!edge.deleted) {
                if (connectedToGround.has(edge.from) && !connectedToGround.has(edge.to) && !graph.nodes[edge.to].deleted) {
                    connectedToGround.add(edge.to);
                    added = true;
                }
                if (connectedToGround.has(edge.to) && !connectedToGround.has(edge.from) && !graph.nodes[edge.from].deleted) {
                    connectedToGround.add(edge.from);
                    added = true;
                }
            }
        });
    } while (added);
    graph.nodes.forEach((node, index) => {
        if (!connectedToGround.has(index)) {
            node.deleted = true;
        }
    });
    graph.edges.forEach(edge => {
        if (graph.nodes[edge.from].deleted || graph.nodes[edge.to].deleted) {
            edge.deleted = true;
        }
    });
}


function computerMove() {
    const groundEdgesCount = countGroundEdges(graph);

    if (currentDifficulty === 'easy') {
        computerMoveEasy(graph);
    } else if (groundEdgesCount === 1) {
        selectedEdge = graph.edges.find(edge => !edge.deleted && (graph.nodes[edge.from].isGround || graph.nodes[edge.to].isGround));
        processComputerMove(graph);
    } else if (currentDifficulty === 'medium') {
        computerMoveMedium(graph);
    } else if (currentDifficulty === 'hard') {
        computerMoveHard(graph);
    }
}

function processComputerMove(graph) {
    if (selectedEdge) {

        setTimeout(() => {
            selectedEdge.deleted = true;
            selectedEdge = null;

            removeIsolatedNodes(graph) ;

            if (checkGameOver()) {
                alert('Гравець програв');
                returnToMenu();
                return;
            }

            currentPlayer = 1;
            document.getElementById('turnIndicator').innerText = "Хід: Гравець";
            drawGraph();
        }, 500);
    }
}

function computerMoveEasy(graph) {
    const availableEdges = graph.edges.filter(edge => !edge.deleted);
    if (availableEdges.length === 0) return;
    selectedEdge = availableEdges[Math.floor(Math.random() * availableEdges.length)];

    processComputerMove(graph);
}

function countGroundEdges(graph) {
    let groundEdgesCount = 0;

    graph.edges.forEach(edge => {
        if (!edge.deleted && (graph.nodes[edge.from].isGround || graph.nodes[edge.to].isGround)) {
            groundEdgesCount++;
        }
    });

    return groundEdgesCount;
}

function computerMoveMedium(graph) {
    let bestEdge = null;
    let bestScore = -Infinity;
    const groundEdgesCount = countGroundEdges(graph);

    for (const edge of graph.edges) {
        if (!edge.deleted) {
            const fromNode = graph.nodes[edge.from];
            const toNode = graph.nodes[edge.to];
            let score = 0;

            if(groundEdgesCount <= 2 && (fromNode.isGround || toNode.isGround)){
                score = -10000;
            }else{
                edge.deleted = true;
                const removedEdges = removeIsolatedNodesWithBackup(graph);

                score = evaluateGraph(graph, groundEdgesCount);

                edge.deleted = false;
                removedEdges.forEach(edge => {
                    edge.deleted = false;
                });
            }

            if (score > bestScore) {
                bestScore = score;
                bestEdge = edge;
            }
        }
    }

    if (bestEdge) {
        selectedEdge = bestEdge;
        processComputerMove(graph);
    }
}

function evaluateGraph(graph, groundEdgesCount) {
    let score = 0;

    graph.edges.forEach(edge => {
        if (!edge.deleted) {
            const fromNode = graph.nodes[edge.from];
            const toNode = graph.nodes[edge.to];
            if (fromNode.isGround || toNode.isGround) {
                score += 5;
            } else {
                score += 1;
            }
        }
    });

    if(groundEdgesCount > 2){
        return score;
    } else{
        return -score;
    }
}

function removeIsolatedNodesWithBackup(graph) {
    const connectedToGround = new Set();

    graph.nodes.forEach((node, index) => {
        if (node.isGround && !node.deleted) {
            connectedToGround.add(index);
        }
    });

    let added;
    do {
        added = false;
        graph.edges.forEach(edge => {
            if (!edge.deleted) {
                if (connectedToGround.has(edge.from) && !connectedToGround.has(edge.to) && !graph.nodes[edge.to].deleted) {
                    connectedToGround.add(edge.to);
                    added = true;
                }
                if (connectedToGround.has(edge.to) && !connectedToGround.has(edge.from) && !graph.nodes[edge.from].deleted) {
                    connectedToGround.add(edge.from);
                    added = true;
                }
            }
        });
    } while (added);

    const removedNodes = [];
    const removedEdges = [];

    graph.nodes.forEach((node, index) => {
        if (!connectedToGround.has(index)) {
            removedNodes.push({ index, ...node });
            node.deleted = true;
        }
    });

    graph.edges.forEach(edge => {
        if (graph.nodes[edge.from].deleted || graph.nodes[edge.to].deleted) {
            if (!edge.deleted) {
                removedEdges.push(edge);
            }
            edge.deleted = true;
        }
    });

    removedNodes.forEach(node => {
        graph.nodes[node.index].deleted = false;
    });

    return  removedEdges ;
}

function isNodeConnectedToGround(graph, nodeIndex) {
    const visited = new Set();
    function dfs(node) {
        if (visited.has(node)) return false;
        visited.add(node);
        if (graph.nodes[node].isGround) return true;
        const neighbors = graph.edges
            .filter((e) => !e.deleted && (e.from === node || e.to === node))
            .map((e) => (e.from === node ? e.to : e.from));
        return neighbors.some(dfs);
    }
    return dfs(nodeIndex);
}

function evaluateMove(graph, edge) {
    edge.deleted = true;
    const removedEdges = removeIsolatedNodesWithBackup(graph);

    const grundyNumbers = graph.nodes.map((_, nodeIndex) => {
        if (!isNodeConnectedToGround(graph, nodeIndex)) {
            return 0;
        }
        const subgraphEdges = graph.edges.filter(
            (e) => !e.deleted && (e.from === nodeIndex || e.to === nodeIndex)
        );
        return subgraphEdges.length;
    });

    edge.deleted = false;
    removedEdges.forEach(edge => {
        edge.deleted = false;
    });
    return grundyNumbers.reduce((acc, num) => acc ^ num, 0);
}

function computerMoveHard(graph) {
    const edges = graph.edges.filter((e) => !e.deleted);
    let bestEdge = null;

    function countGroundEdges(graph) {
        return graph.edges.filter(
            (edge) =>
                !edge.deleted &&
                (graph.nodes[edge.from].isGround || graph.nodes[edge.to].isGround)
        ).length;
    }

    function isCriticalGroundEdge(graph, edge) {
        if (
            graph.nodes[edge.from].isGround ||
            graph.nodes[edge.to].isGround
        ) {
            edge.deleted = true;
            const remainingGroundEdges = countGroundEdges(graph);
            edge.deleted = false;
            return remainingGroundEdges < 2;
        }
        return false;
    }

    function findEdgeConnectedToCritical(graph, criticalEdge) {
        return graph.edges.find(
            (edge) =>
                !edge.deleted &&
                edge !== criticalEdge &&
                (edge.from === criticalEdge.from ||
                    edge.to === criticalEdge.from ||
                    edge.from === criticalEdge.to ||
                    edge.to === criticalEdge.to)
        );
    }

    function minimax(graph, depth, alpha, beta, isMaximizingPlayer) {
        if (depth === 0 || edges.every((e) => e.deleted)) {
            return isMaximizingPlayer
                ? edges.reduce((acc, edge) => acc + evaluateMove(graph, edge), 0)
                : -edges.reduce((acc, edge) => acc + evaluateMove(graph, edge), 0);
        }

        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            for (const edge of edges) {
                if (edge.deleted) continue;

                if (isCriticalGroundEdge(graph, edge)) {
                    const connectedEdge = findEdgeConnectedToCritical(graph, edge);
                    if (connectedEdge) {
                        bestEdge = connectedEdge;
                        return maxEval;
                    }
                    continue;
                }

                edge.deleted = true;
                const removedEdges = removeIsolatedNodesWithBackup(graph);

                const eval = minimax(graph, depth - 1, alpha, beta, false);

                edge.deleted = false;
                removedEdges.forEach((e) => (e.deleted = false));

                if (eval > maxEval) {
                    maxEval = eval;
                    if (depth === 3) bestEdge = edge;
                }
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const edge of edges) {
                if (edge.deleted) continue;

                edge.deleted = true;
                const removedEdges = removeIsolatedNodesWithBackup(graph);

                const eval = minimax(graph, depth - 1, alpha, beta, true);

                edge.deleted = false;
                removedEdges.forEach((e) => (e.deleted = false));

                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    minimax(graph, 3, -Infinity, Infinity, true);

    if (bestEdge) {
        selectedEdge = bestEdge;
        processComputerMove(graph);
    }
    else{
        computerMoveEasy(graph);
    }
}
