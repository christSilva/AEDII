const prompt = require('prompt-sync')({ sigint: true });

const Graph = require('./entities/Graph');
const Node = require('./entities/Node');
const Dijkstra = require('./entities/Dijkstra');

const graph = new Graph();

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
            
            graph.createEdge(src, dest, edge);

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