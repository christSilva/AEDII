const prompt = require('prompt-sync')({ sigint: true });

const Graph = require('./entities/Graph');
const Node = require('./entities/Node');
const Dijkstra = require('./entities/Dijkstra');
const Kruskal = require('./entities/Kruskal');

class Main {

    static main() {

        const graph = new Graph();
            
        graph.createEdge('G', 'H', 1, true);
        graph.createEdge('C', 'I', 2, true);
        graph.createEdge('F', 'G', 2, true);
        graph.createEdge('A', 'B', 4, true);
        graph.createEdge('C', 'F', 4, true);
        graph.createEdge('G', 'I', 6, true);
        graph.createEdge('C', 'D', 7, true);
        graph.createEdge('H', 'I', 7, true);
        graph.createEdge('A', 'H', 8, true);
        graph.createEdge('B', 'C', 8, true);
        graph.createEdge('D', 'E', 9, true);
        graph.createEdge('E', 'F', 10, true);
        graph.createEdge('B', 'H', 11, true);
        graph.createEdge('D', 'F', 14, true);
    
        let opt;

        do {
            console.log('');
            console.log('/'.repeat(50));
            console.log('');
            console.log('[1] Insert Node');
            console.log('[2] Print Adj array');
            console.log('[3] Print Adj list');
            console.log('[4] Dijkstra Algorithm');
            console.log('[5] Kruskal Algorithm\n');
            console.log('[6] Exit\n');

            opt = prompt('Choose an option: ');
            
            switch (opt) {
                case '1':
                    
                    const src = prompt('Source: ').toUpperCase();
                    const dest = prompt('Dest: ').toUpperCase();
                    const edge = Math.round(Number(prompt('Edge (A positive value): ')));
                    
                    do{
                        const isBidirectional = prompt('Is bidirectional? (y/n): ').toUpperCase();
                        if(isBidirectional !== 'Y' || isBidirectional !== 'N')
                            console.log('Invalid input!\n');
    
                    }while(isBidirectional !== 'Y' || isBidirectional !== 'N');
    
                    graph.createEdge(src, dest, edge, isBidirectional == 'Y'? true : false);
    
                    break;
    
                case '2':
                    graph.printAdjArray();
    
                    break;
    
                case '3':
                    graph.printAdjList();
    
                    break;
                case '4':
                    
                    console.log('');
                    const dijkstraSrc = prompt('Source: ').toUpperCase();
                    const dijkstraDest = prompt('Dest: ').toUpperCase();
                    
                    if(!graph.getNode(dijkstraSrc) || !graph.getNode(dijkstraDest)) {
                        console.log('\nERROR: One or both nodes inserted does not exist');
                        break;
                    }
    
                    const dij = new Dijkstra(graph, graph.getNode(dijkstraSrc), graph.getNode(dijkstraDest));
                    const solution = dij.resolve();
    
    
                    console.log('');
                    graph.printAdjList();
                    console.log('');
                    
                    console.log(`The shortest distance from ${dijkstraSrc} to ${dijkstraDest} is: ${solution.distance}`);
                    console.log(`Following the path: ${solution.path}`);
                    console.log('');
    
                    break;
                case '5': 
                    if(graph.getLength() === 0) {
                        console.log('You didn\'t added any node');
                        break;
                    }

                    const kruskal = new Kruskal(graph);
    
                    break;
                case '6': 
                    console.log('\nGoodbye.');
    
                    break;
                default:
                    console.log('\nPlease, choose A valid option.');
    
                    break;
            }
        } while(opt != '6');
    }
}
Main.main();