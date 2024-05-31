import { UsingClient } from 'seyfert';

import mongoose from 'mongoose';

export async function connectDB(client: UsingClient) {
    await mongoose.connect(process.env.DATABASE_URI!, {
        dbName: 'nikobot'
    });

    client.logger.info('Bot connected to database.');
}
