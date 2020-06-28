const child_process = require('child_process');
const config = require('../config.json');
const Utils = require('./utils');

const IP = "127.0.0.1"
const MIN_PLAYERS = 1;
const MAX_PLAYERS = 200;

const CLASSES = [
    "Warrior",
    "Archer",
    "Spearman"
];

let canRun = true;
let justSpawned = true;
let port = process.env.PORT || 3030;


let serverJSON = {
    IP,
    PORT: port,
    serverName: process.env.SERVER_NAME || "TEST SERVER",
    maxPlayers: Math.floor(Math.random() * Math.floor(16)),
    currentMap: "Valley",
    players: []
}

let serverCreateJSON = {
    IP,
    PORT: port,
    serverName: process.env.SERVER_NAME || "TEST SERVER",
    maxPlayers: serverJSON.maxPlayers,
    currentMap: "Valley",
}

const mainLoop = setInterval(async ()=>{
    if(!canRun)
        clearInterval(mainLoop);
    
    if(justSpawned)
    {
        let result = await Utils.CreateServer(serverCreateJSON);

        if(result.status != 200)
        {
            canRun = false;
            console.log(result.message);
        }
        else
            justSpawned = false;
        
    } 
    else {
        let result = await Utils.UpdateServerInfo(serverJSON, serverJSON.maxPlayers, CLASSES);
        if(result.status != 200)
        {
            canRun = false;
            console.log(result.message);
        }
    }

    
}, 10000);