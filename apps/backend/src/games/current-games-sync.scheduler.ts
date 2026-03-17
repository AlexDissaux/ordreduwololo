


import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CurrentGamesService } from "./current-games.services";

@Injectable()
export class CurrentGamesSyncScheduler implements OnApplicationBootstrap {

    constructor(private readonly currentGamesService: CurrentGamesService) {}
    
    @Cron('0 */3 * * * *')
    async handleCurrentGamesSync() {
        console.log('Syncing current games...');
        await this.currentGamesService.setCurrentGamesFromActivePlayers();
    }

    async onApplicationBootstrap() {
        // console.log('Running initial current games sync on startup...');
        // this.handleCurrentGamesSync();
    }
}