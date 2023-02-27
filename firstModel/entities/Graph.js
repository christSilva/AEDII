const Vertice = require('./Vertice')

class Graph {
    constructor() {
        this.vertices = [];        
    }
    createEdge(source, dest, edge = 1) {
        if(this.vertices.length === 20) {
            console.log('\nERROR: The graph has reached the max length');
            return;
        }
        if(edge < 0 || typeof edge !== 'number') {
            console.log('\nERROR: The edge\'s value is invalid\nEnter a positive NUMBER');
            return;
        }
        if(!this.findVertice(source)) 
            this.createVertice(source);

        if(!this.findVertice(dest)) 
            this.createVertice(dest);

        for(let v of this.vertices) {
            if(v.getName() === source && source === dest) {
                v.insert(v, edge);
                break;
            }
            
            if(v.getName() === source) 
                v.insert(this.findVertice(dest), edge);
    
            if(v.getName() === dest)
                v.insert(this.findVertice(source), edge);
        }

        console.log('Edge added sucessful!');
    }
    findVertice(verticeName) {
        for( let v of this.vertices)
            if(v.name === verticeName) return v;
        return null;
    }
    createVertice(verticeName) {
        const newVertice = new Vertice(verticeName);
        this.vertices.push(newVertice);
    }
    printAdjArray() {
        if(this.vertices.length === 0) {
            console.log('Graph\'s empty');
            return;
        }
        let adjArray = [];
        
        for(let i = 0; i < this.vertices.length; i++) {
            adjArray[i] = [];

            for(let j = 0; j < this.vertices.length; j++) 
                adjArray[i].push(this.vertices[i].getEdge(this.vertices[j].name));
            
            console.log(this.vertices[i].name, adjArray[i]);
        }
    }
    printAdjList() {
        if(this.vertices.length === 0) {
            console.log('Graph\'s empty');
            return;
        }

        for( let v of this.vertices)
            console.log(v.getName(), v.getEdges());
    }
}
module.exports = Graph;
