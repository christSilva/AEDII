class Vertice {
    constructor(name) {
        this.name = name;
        this.edges = []
    }
    insert(dest, edge) {
        this.edges.push({
            dest: dest,
            edge: edge,
        })
    }
    getName() {
        return this.name;
    }
    getEdges() {
        let edgesToString = '';

        for(let e of this.edges) 
            edgesToString += `{ ${e.dest.getName()}, ${e.edge} },`
        
        return edgesToString;
    }
    getEdge(dest) {
        for(let e of this.edges) 
            if(e.dest.getName() === dest) return e.edge;
        return null;
    }
    haveDest(dest) {
        for(let e of this.edges) 
            if(e.dest === dest) return true;
        return false;
    }
}
module.exports = Vertice;