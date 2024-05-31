import { Client } from 'seyfert';
import Configuration, { HinagiConfig } from '../config';

import { YunaParser } from '../utils/parser';
import { Manager } from './Manager';

export class HinagiClient extends Client {
    readonly config: HinagiConfig = Configuration;
    readonly manager: Manager;

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
