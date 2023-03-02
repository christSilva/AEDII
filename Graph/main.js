const prompt = require('prompt-sync')({ sigint: true });

const Graph = require('./entities/Graph');
const Node = require('./entities/Node');
const Dijkstra = require('./entities/Dijkstra');

const graph = new Graph();

graph.createEdge('g', 'h', 1, true);
graph.createEdge('c', 'i', 2, true);
graph.createEdge('f', 'g', 2, true);
graph.createEdge('a', 'b', 4, true);
graph.createEdge('c', 'f', 4, true);
graph.createEdge('g', 'i', 6, true);
graph.createEdge('c', 'd', 7, true);
graph.createEdge('h', 'i', 7, true);
graph.createEdge('a', 'h', 8, true);
graph.createEdge('b', 'c', 8, true);
graph.createEdge('d', 'e', 9, true);
graph.createEdge('e', 'f', 10, true);
graph.createEdge('b', 'h', 11, true);
graph.createEdge('d', 'f', 14, true);

let opt;

do {
    console.log('');
    console.log('/'.repeat(50));
    console.log('');
    console.log('[1] Insert Node');
    console.log('[2] Print Adj array');
    console.log('[3] Print Adj list');
    console.log('[4] Dijkstra Algorithm\n');
    console.log('[5] Exit');
    
    console.log('');
    opt = prompt('Choose an option: ');
    
    switch (opt) {
        case '1':
            
            const src = prompt('Source: ').toUpperCase();
            const dest = prompt('Dest: ').toUpperCase();
            const edge = Math.round(Number(prompt('Edge (a positive value): ')));
            
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
            console.log('\nGoodbye.');

            break;
        default:
            console.log('\nPlease, choose a valid option.');

            break;
    }
} while(opt != '5');