import type { ComponentContext } from 'seyfert';
import { ComponentCommand } from 'seyfert';
import { MessageFlags } from 'discord-api-types/v10';

export default class PauseButton extends ComponentCommand {
    componentType = 'Button' as const;

    filter(ctx: ComponentContext<typeof this.componentType>) {
        return ctx.customId === 'previous-button';
    }

    async run(ctx: ComponentContext<typeof this.componentType>) {
        const { client, member } = ctx;

        const me = ctx.me();
        if (!me) return;

        const voice = member?.voice();
        const bot = me.voice();

        if (!voice)
            return ctx.editOrReply({
                flags: MessageFlags.Ephemeral,
                embeds: [
                    {
                        description: 'You need to be in a voice channel to play music!',
                        color: client.config.color
                    }
                ]
            });

        if (bot && voice.channelId !== bot.channelId)
            return ctx.editOrReply({
                flags: MessageFlags.Ephemeral,
                embeds: [
                    {
                        description: 'You need to be in the same voice channel as me to play music!',
                        color: client.config.color
                    }
                ]
            });

        const player = client.manager.getPlayer(ctx.guildId!);
        if (!player)
            return ctx.editOrReply({
                flags: MessageFlags.Ephemeral,
                embeds: [
                    {
                        description: 'There are no tracks currently playing and no tracks in the queue, try adding some tracks!',
                        color: client.config.color
                    }
                ]
            });

        if (!player.queue.previous.length)
            return ctx.editOrReply({
                flags: MessageFlags.Ephemeral,
                embeds: [
                    {
                        description: 'There are no previous tracks to play and no tracks in the queue, try adding some tracks!',
                        color: client.config.color
                    }
                ]
            });

        await ctx.interaction.deferUpdate();
        await player.queue.add(player.queue.previous.shift()!);
    }
}