class Dijkstra {
    constructor(graph, src, dest) {
        this.src = src;
        this.dest = dest;
        this.graph = graph;

        this.notMarkedNodes = graph.getNodes();
        this.nodesDistances = new Map();
        this.solution = [];
    }
    resolve() {
        this.initialize();
        
        this.lowestDistance(this.src, 0, []);
        
        return {
            path:this.solution,
            distance: this.nodesDistances.get(this.dest)
        };
    }
    lowestDistance(node, distance, path) {
        if(!this.notMarkedNodes[node] && this.nodesDistances.get(node) < distance) 
            return;

        path = [...path, node.getName()];
        
        
        if(this.nodesDistances.get(node) > distance) {
            this.nodesDistances.set(node, distance);
            
            if(node === this.dest) {
                this.solution = path;
                return;
            }    
        }
        
        const iterator = node.getEdges();
        
        for(const v of iterator) 
            this.lowestDistance(v[0], distance + v[1], path);
        
        this.markNode(node);
    }
    markNode(node) {
        this.notMarkedNodes = this.notMarkedNodes.filter( n => n != node);
    }
    initialize() {
        for(const v of this.graph.getNodes()) {
           this.nodesDistances.set(v, v === this.src ? 0: Number.POSITIVE_INFINITY);
        }
    }
}
module.exports = Dijkstra;