import { Client } from 'seyfert';
import type { HinagiConfig } from '../config';
import Configuration from '../config';

import { YunaParser } from '../utils/parser';
import { Manager } from './Manager';

export class HinagiClient extends Client {
    readonly manager: Manager;
    readonly config: HinagiConfig = Configuration;

    constructor() {
        super({
            allowedMentions: {
                replied_user: false
            },
            commands: {
                reply: () => true,
                prefix: () => ['hina'],
                argsParser: YunaParser()
            }
        });

        this.manager = new Manager(this);

        this.run();
    }

    public async run(): Promise<void> {
        await this.start();
        await this.uploadCommands();
        await this.manager.handler.load();
    }
}
