const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 615;
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

const graphs = [
    {
        nodes: [
            { x: 200, y: 600, isGround: true },
            { x: 500, y: 600, isGround: true },
            { x: 500, y: 480, isGround: false },
            { x: 560, y: 540, isGround: false },
            { x: 440, y: 540, isGround: false },
            { x: 200, y: 480, isGround: false },
            { x: 260, y: 540, isGround: false },
            { x: 140, y: 540, isGround: false },
            { x: 700, y: 540, isGround: false },
            { x: 700, y: 460, isGround: false },
            { x: 600, y: 440, isGround: false },
            { x: 500, y: 340, isGround: false },
            { x: 60, y: 460, isGround: false },
            { x: 80, y: 540, isGround: false },
            { x: 100, y: 340, isGround: false },
            { x: 200, y: 380, isGround: false },
            { x: 420, y: 380, isGround: false },
            { x: 420, y: 260, isGround: false },
            { x: 200, y: 260, isGround: false },
            { x: 300, y: 260, isGround: false },
            { x: 300, y: 380, isGround: false },

        ],
        edges: [
            { from: 0, to: 7 },
            { from: 5, to: 7 },
            { from: 5, to: 6 },
            { from: 0, to: 6 },
            { from: 7, to: 13 },
            { from: 12, to: 13 },
            { from: 12, to: 14 },
            { from: 14, to: 18 },
            { from: 18, to: 19 },
            { from: 19, to: 17 },
            { from: 11, to: 17 },
            { from: 11, to: 16 },
            { from: 16, to: 20 },
            { from: 15, to: 20 },
            { from: 19, to: 20 },
            { from: 10, to: 11 },
            { from: 10, to: 9 },
            { from: 9, to: 8 },
            { from: 8, to: 3 },
            { from: 3, to: 2 },
            { from: 1, to: 4 },
            { from: 2, to: 4 },
            { from: 1, to: 3 },
            { from: 4, to: 6 },
            { from: 15, to: 14 },
        ],
    },
    {
        nodes: [
            { x: 200, y: 300, isGround: false },
            { x: 600, y: 300, isGround: false },
            { x: 400, y: 150, isGround: false },
            { x: 310, y: 175, isGround: false },
            { x: 235, y: 225, isGround: false },
            { x: 400, y: 300, isGround: false },
            { x: 300, y: 300, isGround: false },
            { x: 500, y: 300, isGround: false },
            { x: 250, y: 380, isGround: false },
            { x: 300, y: 450, isGround: false },
            { x: 250, y: 525, isGround: false },
            { x: 300, y: 600, isGround: true },
            { x: 550, y: 375, isGround: false },
            { x: 550, y: 450, isGround: false },
            { x: 500, y: 525, isGround: false },
            { x: 550, y: 600, isGround: true },
            { x: 380, y: 380, isGround: false },
            { x: 430, y: 430, isGround: false },
            { x: 400, y: 500, isGround: false },
            { x: 490, y: 175, isGround: false },
            { x: 565, y: 225, isGround: false },
        ],
        edges: [
            { from: 0, to: 4 },
            { from: 4, to: 3 },
            { from: 3, to: 2 },
            { from: 2, to: 19 },
            { from: 19, to: 20 },
            { from: 20, to: 1 },
            { from: 1, to:  7},
            { from: 7, to: 5 },
            { from: 5, to:  6},
            { from: 6, to: 8 },
            { from: 8, to: 9 },
            { from: 9, to: 10 },
            { from: 10, to: 11 },
            { from: 5, to: 16 },
            { from: 16, to: 17 },
            { from: 17, to: 18 },
            { from: 7, to: 12 },
            { from: 12, to: 13 },
            { from: 13, to: 14 },
            { from: 14, to: 15 },
            { from: 0, to: 6 },
        ],

    },
    {
        nodes: [
            { x: 100, y: 600, isGround: true },
            { x: 100, y: 420, isGround: false },
            { x: 100, y: 300, isGround: false },
            { x: 200, y: 100, isGround: false },
            { x: 340, y: 300, isGround: false },
            { x: 340, y: 420, isGround: false },
            { x: 600, y: 100, isGround: false },
            { x: 700, y: 300, isGround: false },
            { x: 500, y: 600, isGround: true },
            { x: 500, y: 340, isGround: false },
            { x: 700, y: 340, isGround: false },
            { x: 700, y: 600, isGround: true },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 1, to: 5 },
            { from: 4, to: 5 },
            { from: 2, to: 4 },
            { from: 3, to: 6 },
            { from: 4, to: 7 },
            { from: 6, to: 7 },
            { from: 7, to: 10 },
            { from: 8, to: 9 },
            { from: 9, to: 10 },
            { from: 10, to: 11 },
        ],
    },
    {
        nodes: [
            { x: 100, y: 350, isGround: false },
            { x: 150, y: 250, isGround: false },
            { x: 200, y: 300, isGround: false },
            { x: 300, y: 400, isGround: false },
            { x: 250, y: 500, isGround: false },
            { x: 250, y: 600, isGround: true },
            { x: 320, y: 500, isGround: false },
            { x: 350, y: 600, isGround: true },
            { x: 600, y: 400, isGround: false },
            { x: 650, y: 350, isGround: false },
            { x: 700, y: 400, isGround: false },
            { x: 550, y: 500, isGround: false },
            { x: 550, y: 600, isGround: true },
            { x: 620, y: 500, isGround: false },
            { x: 650, y: 600, isGround: true },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 0 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
            { from: 3, to: 6 },
            { from: 6, to: 7 },
            { from: 3, to: 8 },
            { from: 8, to: 9 },
            { from: 9, to: 10 },
            { from: 8, to: 11 },
            { from: 11, to: 12 },
            { from: 8, to: 13 },
            { from: 13, to: 14 },
        ],
    },
    {
        nodes: [
            { x: 150, y: 600, isGround: true },
            { x: 150, y: 500, isGround: false },
            { x: 250, y: 400, isGround: false },
            { x: 350, y: 350, isGround: false },
            { x: 450, y: 400, isGround: false },
            { x: 550, y: 500, isGround: false },
            { x: 550, y: 600, isGround: true },
            { x: 300, y: 450, isGround: false },
            { x: 400, y: 450, isGround: false },
            { x: 200, y: 300, isGround: false },
            { x: 500, y: 300, isGround: false },
            { x: 700, y: 500, isGround: false },
            { x: 700, y: 600, isGround: true },
            { x: 100, y: 400, isGround: false },
            { x: 600, y: 400, isGround: false },
            { x: 400, y: 200, isGround: false },
            { x: 300, y: 250, isGround: false },
            { x: 500, y: 250, isGround: false },
            { x: 600, y: 200, isGround: false },
        ],
        edges: [
            { from: 0, to: 1 },
            { from: 1, to: 2 },
            { from: 2, to: 7 },
            { from: 7, to: 3 },
            { from: 7, to: 8 },
            { from: 3, to: 8 },
            { from: 3, to: 4 },
            { from: 4, to: 8 },
            { from: 8, to: 5 },
            { from: 5, to: 6 },
            { from: 8, to: 10 },
            { from: 7, to: 9 },
            { from: 9, to: 13 },
            { from: 13, to: 1 },
            { from: 10, to: 15 },
            { from: 15, to: 16 },
            { from: 16, to: 17 },
            { from: 17, to: 18 },
            { from: 18, to: 14 },
            { from: 14, to: 10 },
            { from: 14, to: 5 },
            { from: 12, to: 11 },
            { from: 11, to: 5 },
            { from: 12, to: 6 },
        ],
    },
    {
        nodes: [
            { x: 150, y: 600, isGround: true },
            { x: 150, y: 500, isGround: false },
            { x: 150, y: 400, isGround: false },

            { x: 350, y: 600, isGround: true },
            { x: 350, y: 400, isGround: false },
            { x: 350, y: 300, isGround: false },

            { x: 550, y: 600, isGround: true },
            { x: 550, y: 400, isGround: false },
            { x: 550, y: 300, isGround: false },

            { x: 150, y: 200, isGround: false },
            { x: 100, y: 300, isGround: false },
            { x: 200, y: 300, isGround: false },

            { x: 300, y: 200, isGround: false },
            { x: 400, y: 200, isGround: false },

            { x: 700, y: 400, isGround: false },
            { x: 700, y: 300, isGround: false },
            { x: 700, y: 200, isGround: false },
            { x: 600, y: 100, isGround: false },
            { x: 500, y: 100, isGround: false },
            { x: 500, y: 200, isGround: false },
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
            { from: 6, to: 7 },
            { from: 7, to: 8 },
            { from: 2, to: 10 },
            { from: 2, to: 11 },
            { from: 11, to: 9 },
            { from: 10, to: 9 },
            { from: 5, to: 12 },
            { from: 5, to: 13 },
            { from: 0, to: 1 },

            { from: 14, to: 8 },
            { from: 15, to: 8 },
            { from: 16, to: 8 },
            { from: 17, to: 8 },
            { from: 18, to: 17 },
            { from: 19, to: 17 },
            { from: 19, to: 18 },
        ],
    },
];

let currentGraph = -1;
let selectedEdge = null;
let currentPlayer = 1;
let isComputerPlayer = true;
let currentDifficulty = 'easy';

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

    graphs.forEach(graph => {
        graph.nodes.forEach(node => node.deleted = false);
        graph.edges.forEach(edge => edge.deleted = false);
    });
}

function loadGraph(index) {
    currentGraph = index;
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
    ctx.strokeStyle = 'black';
    ctx.setLineDash([10, 5]);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawGraph() {
    const graph = graphs[currentGraph];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGroundLine();
    graph.edges.forEach(edge => {
        const fromNode = graph.nodes[edge.from];
        const toNode = graph.nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = (edge === selectedEdge) ? 'green' : edge.deleted ? 'gray' : 'black';
        ctx.lineWidth = 5;
        ctx.stroke();
    });
    graph.nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.deleted ? 'gray' : 'black';
        ctx.fill();
    });
}

canvas.addEventListener('click', (event) => {
    if (currentGraph === -1 || currentPlayer !== 1) return;

    const graph = graphs[currentGraph];
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
    const graph = graphs[currentGraph];
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
    const graph = graphs[currentGraph];
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
    const graph = graphs[currentGraph];
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
    let bestScore = 0;
    const groundEdgesCount = countGroundEdges(graph);

    for (const edge of graph.edges) {
        if (!edge.deleted) {

            const score = evaluateGraphMedium(graph, edge, groundEdgesCount);

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
    else{
        computerMoveEasy(graph);
    }
}

function evaluateGraphMedium(graph, edge, groundEdgesCount) {
    let score = 0;
    const fromNode = graph.nodes[edge.from];
    const toNode = graph.nodes[edge.to];

    if(groundEdgesCount <= 2 && (fromNode.isGround || toNode.isGround)){
        return -100000;
    }else{
        edge.deleted = true;
        const removedEdges = removeIsolatedNodesWithBackup(graph);

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

        edge.deleted = false;
        removedEdges.forEach(edge => {
            edge.deleted = false;
        });

        if(groundEdgesCount > 2){
            return score;
        } else{
            return -score;
        }
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


function calculateGrundyNumber(graph, edge) {
    // Видалити ребро тимчасово
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

    // Відновити ребро
    edge.deleted = false;
    removedEdges.forEach(edge => {
        edge.deleted = false;
    });
    // Повернути Гранді-число графа
    return grundyNumbers.reduce((acc, num) => acc ^ num, 0);
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
    const grundyNumber = calculateGrundyNumber(graph, edge);

    // Евристична оцінка
    let heuristic = 0;

    if (isNodeConnectedToGround(graph, edge.from) && !isNodeConnectedToGround(graph, edge.to)) {
        heuristic += 5; // Ребро важливе для противника
    }

    // Загальна оцінка
    return grundyNumber + heuristic;
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

                // Перевірка критичності ребра землі
                if (isCriticalGroundEdge(graph, edge)) {
                    const connectedEdge = findEdgeConnectedToCritical(graph, edge);
                    if (connectedEdge) {
                        bestEdge = connectedEdge;
                        return maxEval; // Повертаємо одразу, бо знайшли важливий хід
                    }
                    continue; // Якщо немає пов'язаного, продовжуємо
                }

                // Видалити ребро і оновити граф
                edge.deleted = true;
                const removedEdges = removeIsolatedNodesWithBackup(graph);

                const eval = minimax(graph, depth - 1, alpha, beta, false);

                // Відновити граф
                edge.deleted = false;
                removedEdges.forEach((e) => (e.deleted = false));

                // Оновити максимальну оцінку та найкращий хід
                if (eval > maxEval) {
                    maxEval = eval;
                    if (depth === 3) bestEdge = edge; // Зберегти найкращий хід
                }
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) break; // Альфа-бета відсікання
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const edge of edges) {
                if (edge.deleted) continue;

                // Видалити ребро і оновити граф
                edge.deleted = true;
                const removedEdges = removeIsolatedNodesWithBackup(graph);

                const eval = minimax(graph, depth - 1, alpha, beta, true);

                // Відновити граф
                edge.deleted = false;
                removedEdges.forEach((e) => (e.deleted = false));

                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) break; // Альфа-бета відсікання
            }
            return minEval;
        }
    }

    // Виклик мінімаксу
    minimax(graph, 3, -Infinity, Infinity, true);

    // Повернути найкращий хід
    if (bestEdge) {
        selectedEdge = bestEdge;
        processComputerMove(graph);
    }
    else{
        computerMoveEasy(graph);
    }
}
