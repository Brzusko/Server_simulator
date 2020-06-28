const child_process = require('child_process');
const config = require('./config.json');
const path = require('path');


const processes = [];

let firstRun = true;

const interval = setInterval(()=>{
    if(firstRun){
        let modulePath = path.resolve('./src', 'server_script.js');
        for(let i = 0; i < 4; i++){
            const process = child_process.fork(modulePath, [], {
                env: {
                    PORT: config.STARTING_PORT + i
                }
            })
            process.on('error', (err) =>{
                console.log(err);
            })
            processes.push(process);
        }
    }
    firstRun = false;
}, 100);

console.log('Test');