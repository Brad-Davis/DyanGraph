import Node from './node.js';

class Graph {
    constructor() {
        this.nodes = [
            new Node('kelly', 100, 100, '/kelly.jpg', 'https://www.google.com'),
            new Node('kelly2', 300, 100, '/kelly.jpg', 'https://www.google.com'),
        ];
        this.nodeContainers = new Map();
        this.graphImgUrl = '/graph.jpg';
        this.graph = document.getElementById('graph');
        this.showNodes();
    }

    setupGraph() {
        this.graph.style.backgroundImage = `url(${this.graphImgUrl})`;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    showNodes() {
        const graphWidth = this.graph.clientWidth;
        const graphHeight = this.graph.clientHeight;
        
        this.nodes.forEach(node => {
            let nodeElement;
            if (this.nodeContainers.has(node.name)) {
                nodeElement = this.nodeContainers.get(node.name);
            } else {
                nodeElement = document.createElement('img');
                nodeElement.className = 'node-container';
                this.nodeContainers.set(node.name, nodeElement);
                nodeElement.src = node.imgUrl;
            }
            
            nodeElement.style.left = `${node.x + graphWidth / 2}px`;
            nodeElement.style.top = `${-node.y + graphHeight / 2}px`;
            this.graph.appendChild(nodeElement);
        });
    }
}

export default Graph;