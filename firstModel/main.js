const prompt = require('prompt-sync')({ sigint: true });

const Graph = require('./entities/Graph');

const graph = new Graph();

let opt;

do {
    console.log('');
    console.log('[1] Insert vertice');
    console.log('[2] Print Adj array');
    console.log('[3] Print Adj list');
    console.log('[4] Exit');
    
    console.log('');
    opt = prompt('Choose an option: ');
    console.log('');
    
    switch (opt) {
        case '1':
            console.log('');
            let src = prompt('Source: ');
            let dest = prompt('Dest: ');
            let edge = Number(prompt('Edge (An positive value): '));
            graph.createEdge(src, dest, edge);

            break;

        case '2':
            graph.printAdjArray();

            break;

        case '3':
            graph.printAdjList();

            break;
        
        case '4': 
            console.log('\nGoodbye.');

            break;
        default:
            console.log('\nPlease, choose an valid option.');

            break;
    }
} while(opt != '4');