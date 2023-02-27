class Node {
    constructor(name) {
        this.name = name;
        this.edges = new Map();
    }
    insert(dest, edge) {
        this.edges.set(dest, edge)
    }
    edgesToString() {
        let edgesToString = '';
        
        for(const i of this.getEdges()) {
            edgesToString += `{ ${i[0].getName()} => ${i[1]} },`
        }
        
        return edgesToString;
    }
    getName() {
        return this.name;
    }
    getEdge(dest) {
        return this.edges.get(dest) || 0;
    }
    getEdges() {
        return this.edges.entries();
    }
    haveDest(dest) {
        return this.edges.has(dest);
    }
    getAdjNodesSize() {
        return this.edges.size;
    }
}
module.exports = Node;