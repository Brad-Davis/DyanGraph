import Graph from './graph.js';

const graph = new Graph();
graph.setupGraph();

// Function to set scroll position to halfway
function setScrollToHalfway() {
    const graphContainer = document.getElementById('graph-container');
    const graph = document.getElementById('graph');
    
    if (graphContainer && graph) {
        // Calculate halfway point
        const scrollWidth = graphContainer.scrollWidth;
        const containerWidth = graphContainer.clientWidth;
        const halfwayPoint = (scrollWidth - containerWidth) / 2;
        
        // Set scroll position to halfway
        graphContainer.scrollLeft = halfwayPoint;
    }
}

// Set scroll position on startup
setScrollToHalfway();

// Set scroll position on window resize
window.addEventListener('resize', ()=> {
    setScrollToHalfway();
    graph.showNodes();
});