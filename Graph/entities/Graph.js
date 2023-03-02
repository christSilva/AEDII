const Node = require('./Node')

class Graph {
    constructor() {
        this.nodes = [];        
    }
    createEdge(source, dest, edge, isBidirectional) {
        if(this.haveErrors(source, dest, edge)) return;
    
        if(!this.getNode(source)) 
            this.createNode(source);

        if(!this.getNode(dest)) 
            this.createNode(dest);

        for(let v of this.nodes) {
            if(v.getName() === source && source === dest) {
                v.insert(v, edge);
                break;
            }
            
            if(v.getName() === source) 
                v.insert(this.getNode(dest), edge);
            
            if(isBidirectional) {
                    if(v.getName() === dest) 
                        v.insert(this.getNode(source), edge);
            }
        }

        // console.log('\nEdge added sucessful!');
    }
    haveErrors(source, dest, edge) {
        if(this.getLength() === 20) {
            console.log('\nERROR: The graph has reached the max length');
            return true;
        }
        if(source.length === 0 || dest.length === 0) {
            console.log('\nERROR: Unable to add nodes with an empty name');
            return true;
        }
        if(edge < 0 || typeof edge !== 'number') {
            console.log('\nERROR: The edge\'s value is invalid\nEnter a positive NUMBER');
            return true;
        }
        return false;
    }
    createNode(nodeName) {
        const newNode = new Node(nodeName);
        this.nodes.push(newNode);
    }
    printAdjArray() {
        if(this.getLength() === 0) {
            console.log('Graph\'s empty');
            return;
        }
        let adjArray = [];
        
        for(let i = 0; i < this.getLength(); i++) {
            adjArray[i] = [];

            for(let j = 0; j < this.getLength(); j++) 
                adjArray[i].push(this.nodes[i].getEdge(this.nodes[j]));
            
            console.log(this.nodes[i].name, adjArray[i]);
        }
    }
    printAdjList() {
        if(this.getLength() === 0) {
            console.log('Graph\'s empty');
            return;
        }
        
        for( let v of this.nodes)
            console.log(v.getName(), v.edgesToString());
    }
    getNode(nodeName) {
        for( let v of this.nodes)
            if(v.name === nodeName) return v;
        return null;
    }
    getNodes() {
        return this.nodes;
    }
    getLength() {
        return this.nodes.length;
    }
}
module.exports = Graph;
