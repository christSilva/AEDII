class Dijkstra {
    constructor(graph, src, dest) {
        this.src = src;
        this.dest = dest;
        this.graph = graph;
        this.unvisitedNodes = graph.getNodes();
        this.nodesDistances = new Map();
        this.path = [];
    }
    resolve() {
        this.initialize();
        
        this.shortestDistance(this.src, 0, []);
        
        return {
            path:this.path,
            distance: this.nodesDistances.get(this.dest)
        };
    }
    shortestDistance(node, distance, path) {
        if(!this.unvisitedNodes[node] && this.nodesDistances.get(node) < distance) 
            return;

        path = [...path, node.getName()];
        
        this.nodesDistances.set(node, distance);
        
        if(node === this.dest) {
            this.path = path;
            return;
        }    
        
        const edges = node.getEdges();
        
        for(const [node, edge] of edges) 
            this.shortestDistance(node, distance + edge, path);
        
        this.markVisited(node);
    }
    markVisited(node) {
        this.unvisitedNodes = this.unvisitedNodes.filter( n => n != node);
    }
    initialize() {
        for(const node of this.graph.getNodes()) {
            const distance = node === this.src ? 0: Number.POSITIVE_INFINITY;
            this.nodesDistances.set(node, distance);
        }
    }
}
module.exports = Dijkstra;