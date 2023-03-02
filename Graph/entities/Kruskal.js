const Graph = require('./Graph');

class Kruskal {
    constructor(graph) {
        this.graph = graph;
        this.mst = new Graph();
        this.edgesList = [];
        this.resolve();
    }
    resolve() {
        this.createEdgesList();
        this.createMST();

        console.log('\nThe minimum graph of:\n');
        this.graph.printAdjList();
        console.log('\nIs: \n');
        this.mst.printAdjList();
    }
    createEdgesList() {
        for(const node of this.graph.getNodes()) {
            const iterator = node.getEdges();

            for(const [ adj, edge ] of iterator) {
                if(!this.edgeExists(node, adj)) {
                    this.edgesList.push({
                        edge: edge,
                        nodeA: node.getName(),
                        nodeB: adj.getName(),
                    });
                }
            }
        }
        this.sortEdgesList();
        console.log(this.edgesList);

    }
    createMST() {
        let set = this.graph.getNodes().map(node => [node.getName()]);

        for(const edge of this.edgesList) {
            if(set.length === 1) 
                break;
                
            for(const subSet of set) {
                if(this.areInTheSameSet(set, edge.nodeA, edge.nodeB))
                    break;
                
                
                set = this.mergeSubSets(set, edge.nodeA, edge.nodeB);
            
            this.mst.createEdge(edge.nodeA, edge.nodeB, edge.edge);
            this.mst.createEdge(edge.nodeB, edge.nodeA, edge.edge);
            }
        }
    }
    areInTheSameSet(set, nodeA, nodeB) {
        for(const subSet of set) {
            if(subSet.filter(e => e === nodeA || e === nodeB).length === 2)
                return true;
        }
        return false;
    }
    mergeSubSets(set, nodeA, nodeB) {
        let subSetA = [];
        let subSetB = [];

        for(const subSet of set) {
            if(subSet.some(e => e === nodeA))
                subSetA = subSet;
            if(subSet.some(e => e === nodeB))
                subSetB = subSet;
        }
        set = set.filter(s => !s.some(e => e === nodeA));
        set = set.filter(s => !s.some(e => e === nodeB));

        set.push([...subSetA, ...subSetB]); 
        return set;
    }
    edgeExists(nodeA, nodeB) {
        const nameA = nodeA.getName();
        const nameB = nodeB.getName();

        for(const e of this.edgesList) {
            if(e.nodeA === nameA || e.nodeA === nameB)
                if(e.nodeB === nameA || e.nodeB === nameB)
                    return true;
        }
        return false;
    }
    sortEdgesList() {
        this.edgesList.sort((a, b) => a.edge - b.edge);
    }
   
}
module.exports = Kruskal;

// const graph = new Graph();

// graph.createEdge('g', 'h', 1, true);
// graph.createEdge('c', 'i', 2, true);
// graph.createEdge('f', 'g', 2, true);
// graph.createEdge('a', 'b', 4, true);
// graph.createEdge('c', 'f', 4, true);
// graph.createEdge('g', 'i', 6, true);
// graph.createEdge('c', 'd', 7, true);
// graph.createEdge('h', 'i', 7, true);
// graph.createEdge('a', 'h', 8, true);
// graph.createEdge('b', 'c', 8, true);
// graph.createEdge('d', 'e', 9, true);
// graph.createEdge('e', 'f', 10, true);
// graph.createEdge('b', 'h', 11, true);
// graph.createEdge('d', 'f', 14, true);

// const kruskal = new Kruskal(graph);
