import { LavalinkManager } from 'lavalink-client';
import { UsingClient } from 'seyfert';
import { Handler } from './Handler';

import { autoPlayFunction } from '../utils/functions/autoplay';

export class Manager extends LavalinkManager {
    readonly handler: Handler;

    constructor(client: UsingClient) {
        super({
            nodes: client.config.nodes,
            sendToShard: (guildId, payload) => client.gateway.send(client.gateway.calculateShardId(guildId), payload),
            playerOptions: {
                defaultSearchPlatform: 'spsearch',
                onEmptyQueue: {
                    autoPlayFunction,
                }
            },
        })

        this.handler = new Handler(client);
    }

    public async search(query: string) {
        const node = this.nodeManager.leastUsedNodes()[0];
        return node.search(query, null);;
    }
}