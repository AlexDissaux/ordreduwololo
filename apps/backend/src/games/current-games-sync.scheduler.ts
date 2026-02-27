


import { Injectable } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";

@Injectable()
export class CurrentGamesSyncScheduler {
    
    @Cron('0 */2 * * * *')
    async handleCurrentGamesSync() {
        console.log('Syncing current games...');
    }

    @Timeout(20000)
    async handleInitialSync() {
        console.log('Running initial current games sync on startup...');
        await this.handleCurrentGamesSync();
    }
}