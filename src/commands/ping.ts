import { Command, Declare, type CommandContext } from 'seyfert';

@Declare({
    name: 'ping',
    description: 'Respond with pong!'
})
export default class PingCommand extends Command {
    async run(ctx: CommandContext) {
        await ctx.editOrReply({ content: 'pong!' });
    }
}
