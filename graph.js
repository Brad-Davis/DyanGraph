import Node from './node.js';

class Graph {
    constructor() {
        this.nodes = [
            new Node('The Hollywood Reporter | Kelly Marie Tran', 100, -100, 150, 0, '/kelly.jpg', 'https://www.google.com'),
            new Node('Chromic Duo | Room of Oceans', 150, 200, 150, 150, '/chromic.png', 'https://www.google.com'),
            new Node('Hulu | Hellraiser', 500, -120, 150, 0, '/hell.png', 'https://www.google.com'),
        ];
        this.nodeContainers = new Map();
        this.graphImgUrl = '/graph.png';
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
            let containerElement;
            let nodeElement;
            let labelElement;
            
            if (this.nodeContainers.has(node.name)) {
                containerElement = this.nodeContainers.get(node.name);
                nodeElement = containerElement.querySelector('img');
                labelElement = containerElement.querySelector('.node-label');
            } else {
                // Create container div
                containerElement = document.createElement('div');
                containerElement.className = 'node-container';
                this.nodeContainers.set(node.name, containerElement);
                
                // Create image element
                nodeElement = document.createElement('img');
                nodeElement.src = node.imgUrl;
                
                // Create label element
                labelElement = document.createElement('div');
                labelElement.className = 'node-label';
                labelElement.textContent = node.name;
                
                // Append image and label to container
                containerElement.appendChild(nodeElement);
                containerElement.appendChild(labelElement);
                
                // Add hover event listeners
                containerElement.addEventListener('mouseenter', () => {
                    node.onHover();
                    containerElement.classList.add('node-hover');
                });
                
                containerElement.addEventListener('mouseleave', () => {
                    node.onLeave();
                    containerElement.classList.remove('node-hover');
                });
                
                // Add click handler
                containerElement.addEventListener('click', () => {
                    node.onClick();
                });
                
                // Append container to graph
                this.graph.appendChild(containerElement);
            }
            
            // Position and size the container
            containerElement.style.left = `${node.x + graphWidth / 2}px`;
            containerElement.style.top = `${-node.y + graphHeight / 2}px`;
            
            if (node.width !== 0) {
                containerElement.style.width = `${node.width}px`;
                nodeElement.style.width = '100%';
            } else {
                containerElement.style.width = 'auto';
                nodeElement.style.width = 'auto';
            }
            
            if (node.height !== 0) {
                containerElement.style.height = `${node.height}px`;
                nodeElement.style.height = '100%';
            } else {
                containerElement.style.height = 'auto';
                nodeElement.style.height = 'auto';
            }
        });
    }
}

export default Graph;