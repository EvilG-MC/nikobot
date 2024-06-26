import type { LavalinkNodeOptions } from 'lavalink-client';

export interface HinagiConfig {
    color: number;
    nodes: LavalinkNodeOptions[];
    prefixes: string[];
    emojis: {
        error: string;
        success: string;
        previous: string;
        pause: string;
        next: string;
        stop: string;
    };
}

export const Configuration: HinagiConfig = {
    color: 0x2b2d31,
    prefixes: ['hina', 'h!', 'hinagi'],
    emojis: {
        error: '❌',
        next: '⏭️',
        pause: '⏸️',
        previous: '⏮️',
        stop: '⏹️',
        success: '✅'
    },
    nodes: [
        {
            id: 'Node 0',
            host: 'localhost',
            port: 2333,
            authorization: 'ganyuontopuwu'
        }
    ]
};
