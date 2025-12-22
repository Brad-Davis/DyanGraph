import Node from './node.js';

class Graph {
    constructor() {
        this.nodes = [
            new Node('The Hollywood Reporter | Kelly Marie Tran', 100, -100, 150, 0, 'kelly.jpg', 'https://www.google.com'),
            new Node('Chromic Duo | Room of Oceans', 150, 200, 150, 150, 'chromic.png', 'https://www.google.com'),
            new Node('Hulu | Hellraiser', 400, -120, 150, 0, 'hell.png', 'https://www.google.com'),
            // Personal projects from dyanjong.com/personal
            new Node('The Huntington | Green Boy 3D Scan', -150, -200, 150, 0, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/0ef745fa-a17f-450f-9040-a71a8a472463/7_31_2025-snapshot-2025-08-03_22-31-35.png', 'https://dyanjong.com/the-huntington-green-boy-3d-scan/'),
            new Node('Reality Hack at MIT | Rescue Ready VR', -300, 100, 150, 0, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/fad14cde-c2ad-4650-b8b5-7db24ab0ae4f/RescueReadyVR_thumb.jpg', 'https://dyanjong.com/reality-hack-at-mit-rescue-ready-vr/'),
            new Node('Postcard Cabins | Artist Fellowship', -200, 300, 150, 150, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/97afbe02-389b-4b19-958e-2b9dbba1c106/Getaway_flowers_s.jpg', 'https://dyanjong.com/postcard-cabins/'),
            new Node('Rei Brown', 250, 250, 150, 0, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/faeadc19-9c20-4710-9c9d-93926011ad5f/ReiBrown2-snapshot-2025-09-02_19-24-20.png', 'https://dyanjong.com/rei-brown/'),
            new Node('Cyanotypes', 500, 100, 150, 150, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/1706141763759-0KH47QYMU06YYX1CJGF9/Dimples_alstroemeria_blue.jpg', 'https://dyanjong.com/cyanotypes/'),
            new Node('Cinespace 2020 | Baobei', 300, -250, 150, 0, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/1595052297041-VDOJ734PVI9RRFZ6AF1V/image-asset.jpeg', 'https://dyanjong.com/cinespace-2020-baobei/'),
            new Node('ALBUMTONES', -100, -350, 150, 0, 'https://images.squarespace-cdn.com/content/v1/56415ecbe4b0d6710e2cde00/0974d602-851f-49ac-a079-ba4d5aa280e7/Screenshot+2025-12-01+at+9.12.32%E2%80%AFPM.png', 'https://dyanjong.com/albumtones/'),
        ];
        this.nodeContainers = new Map();
        this.graph = document.getElementById('graph');
        this.mobileActiveNode = null; // Track which node is in mobile hover mode
        this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.setupMobileClickOutside();
        this.showNodes();
    }

    setupMobileClickOutside() {
        // Reset mobile active node when clicking outside nodes
        if (this.isMobile) {
            this.graph.addEventListener('touchstart', (e) => {
                // Only reset if clicking directly on the graph (not on a node container)
                if (e.target === this.graph) {
                    if (this.mobileActiveNode) {
                        const prevContainer = this.nodeContainers.get(this.mobileActiveNode.name);
                        if (prevContainer) {
                            prevContainer.classList.remove('node-hover');
                            const prevLabel = prevContainer.querySelector('.node-label');
                            if (prevLabel) {
                                prevLabel.style.opacity = 0;
                            }
                            this.mobileActiveNode.onLeave();
                        }
                        this.mobileActiveNode = null;
                    }
                }
            });
        }
    }

    setupGraph() {
    }

    addNode(node) {
        this.nodes.push(node);
    }

    shakeNode(nodeElement, node) {
        if (node.isActive || this.isMobile) {
            return;
        }

        nodeElement.style.transform = 'translate(' + Math.random() * 5 + 'px, ' + Math.random() * 5 + 'px)';
            
        setTimeout(() => {
           
            this.shakeNode(nodeElement, node);
        }, 300);
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
                labelElement.innerHTML = '<span class="node-name">' + node.name + '<br <br>' + '<span class="view-more">— view —</span></span>';
                
                // Append image and label to container
                containerElement.appendChild(nodeElement);
                containerElement.appendChild(labelElement);
                
                // Add hover event listeners (for desktop)
                containerElement.addEventListener('mouseenter', () => {
                    
                    node.isActive = true;
                    containerElement.classList.add('node-hover');
                    containerElement.style.transform = 'scale(1.7)';
                    labelElement.style.opacity = 1;
                    node.onHover();
                });
                
                containerElement.addEventListener('mouseleave', () => {
                    node.onLeave();
                    node.isActive = false;
                    this.shakeNode(containerElement, node);
                    containerElement.classList.remove('node-hover');
                    labelElement.style.opacity = 0;
                });
                
                // Add touch event listeners (for mobile hover)
                if (this.isMobile) {
                    containerElement.addEventListener('touchstart', (e) => {
                        e.preventDefault(); // Prevent double-tap zoom
                        e.stopPropagation(); // Prevent event from bubbling to graph
                        // Reset previous active node
                        if (this.mobileActiveNode && this.mobileActiveNode !== node) {
                            const prevContainer = this.nodeContainers.get(this.mobileActiveNode.name);
                            if (prevContainer) {
                                prevContainer.classList.remove('node-hover');
                                const prevLabel = prevContainer.querySelector('.node-label');
                                if (prevLabel) {
                                    prevLabel.style.opacity = 0;
                                }
                                this.mobileActiveNode.onLeave();
                            }
                        }
                        // Activate hover for this node
                        if (this.mobileActiveNode === node) {
                            // Second tap - navigate
                            node.onClick();
                            // Reset hover state
                            this.mobileActiveNode = null;
                            containerElement.classList.remove('node-hover');
                            labelElement.style.opacity = 0;
                            node.onLeave();
                        } else {
                            // First tap - show hover
                            this.mobileActiveNode = node;
                            node.onHover();
                            containerElement.classList.add('node-hover');
                            labelElement.style.opacity = 1;
                        }
                    });
                }
                
                // Add click handler (for desktop)
                containerElement.addEventListener('click', () => {
                    if (!this.isMobile) {
                        node.onClick();
                    }
                });
                
                // Append container to graph
                this.graph.appendChild(containerElement);
            }
            
            // Position and size the container
            containerElement.style.left = `${node.x + graphWidth / 2}px`;
            containerElement.style.top = `${-node.y + graphHeight / 2}px`;
            this.shakeNode(containerElement, node);
            
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