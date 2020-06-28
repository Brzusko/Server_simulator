const http = require('request-promise');
const config = require('../config.json');
const Player = require('./Player');

class Utils {
    constructor(){

    }

    static async GetRandomNameFromAPI() {
        
        const options = {
            method: 'GET',
            uri: 'https://api.namefake.com/',
            json: true
        }

        let result;

        try {
            result = await http(options);
            return result;

        } catch(ex) {console.log(ex);}
    }

    static async GeneratePlayers(count, classes) {
        const players = [];
        for(let i = 0; i < count; i++)
        {
            try {

                const playerData = await this.GetRandomNameFromAPI();
                const playerClass = classes[Math.floor(Math.random() * Math.floor(classes.length))];
                const playerScore = Math.floor(Math.random() * 1000);
    
                const player = new Player(playerData.name, playerClass, playerScore);
    
                players.push(player);

            } catch(ex) {}

        }
        return players;
    }

    static async CreateServer(serverJSON){
        let options = {
            method: 'POST',
            uri: `${config.IP}:${config.PORT}/createserver`,
            json: true,
            body: serverJSON
        }
        return await http(options);
    }

    static async UpdateServerInfo(serverJSON, count, classes) {
        serverJSON.players = await this.GeneratePlayers(count, classes);
        let options = {
            method: 'POST',
            uri: `${config.IP}:${config.PORT}/detailedinfo`,
            json: true,
            body: serverJSON
        }
        return await http(options);
    }
}


module.exports = Utils;