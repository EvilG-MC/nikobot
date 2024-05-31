import type { ParseClient } from 'seyfert';
import { HinagiClient } from '../../structures/Client';

export { AllLavaEvents, LavaEventRun, LavaEventType, LavaManagerEvents, LavaNodeEvents, LavalinkEvent } from './client/Lavalink';

declare module 'seyfert' {
    interface UsingClient extends ParseClient<HinagiClient> { }
}
